<script setup>
  import { io } from 'socket.io-client';
  import { onBeforeMount, ref } from 'vue';
  import axios from 'axios';
  const apiUrl = 'http://localhost:3001';
  const socket = io(apiUrl);
  const messages = ref([]);
  const messageText = ref('');
  const joined = ref(false);
  const name = ref('');
  const typingDisplay = ref('');
  const room = ref('');
  
  onBeforeMount( () => {
    socket.emit('findAllMessages',{room: room.value},response => {
      messages.value = response;
    }); 

    socket.on('message', (message) => {
    messages.value.push(message);

    socket.on('typing', ({ name, isTyping }) => {
      if (isTyping) {
        typingDisplay.value = `${name}님이 입력중입니다...`;
      } else {
        typingDisplay.value = '';
      }
    })
  });
  })

  //Method
  const sendMessage = () => {
    socket.emit('createMessage',{ text: messageText.value }, response => {
      messageText.value ='';
    })
  }
  const join = () => {
    axios.post(`${apiUrl}/join`, {
      name: name.value
    }).then((response) => {
      joined.value = true; 
    }).catch((error) => console.log(error));
  }

  let timeout;
  const emitTyping = () => {
    socket.emit('typing', { isTyping: true});
    timeout = setTimeout(() => {
      socket.emit('typing', { isTyping: false});
    },2000)
  }
  
</script>

<template>
  <div class="chat">
    <div v-if="!joined">
      <div class="greetings">
        <h1 class="green">OJT WebSocket</h1>
        <form @submit.prevent="join">
        <h3 class="white">닉네임을 입력하세요.</h3>
        <input v-model="name"/><br><br>
        <h3 class="white">Room 코드를 입력하세요.</h3>
        <input v-model="room"/><br>
        <button type="submit">제출</button>
        </form>
      </div>
    </div>
    <div class="chat-container" v-else>
      <div v-if="!joined">
        <div class="rooms-container">
          <!-- find room -->
        </div>
      </div>
      <div v-else>
        <div class="messages-container">
          <div v-for="message in messages">
            [{{message.time}}][{{message.name}}] : {{message.text}}
          </div>
        </div>
        <div v-if="typingDisplay">{{ typingDisplay }}</div>
        <div class="message-input">
          <form @submit.prevent="sendMessage">
            <input v-model="messageText" @input="emitTyping"/> <br>
            <button type="submit">전송</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>>

<style>
@import './assets/base.css';

.chat{
  padding: 20px;
  height: 100vh;
}

.chat-container{
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container{
  flex: 1;
}

input {
  width: 200px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
}

button {
  margin: 15px 0px 10px;
  position: relative;
  border: none;
  display: inline-block;
  padding: 10px 10px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}
</style>

