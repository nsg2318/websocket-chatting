<script setup>
  import { io } from 'socket.io-client';
  import { onBeforeMount, ref } from 'vue';
  const socket = io('http://localhost:3001');
  const messages = ref([]);
  const messageText = ref('');
  const joined = ref(false);
  const name = ref('');
  const typingDisplay = ref('');
  
  onBeforeMount( () => {
    socket.emit('findAllMessages',{},response => {
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
    socket.emit('join', { name: name.value }, () => {
      joined.value = true;
    });
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
      <form @submit.prevent="join">
        <label>enter your nickname</label><br>
        <input v-model="name"/>
        <button type="submit">제출</button>
      </form>
    </div>
    <div class="chat-container" v-else>
      <div class="messages-container">
        <div v-for="message in messages">
          [{{message.time}}][{{message.name}}] : {{message.text}}
        </div>
      </div>
      <div v-if="typingDisplay">{{ typingDisplay }}</div>
      <div class="message-input">
        <form @submit.prevent="sendMessage">
          <label>Msg : </label>
          <input v-model="messageText" @input="emitTyping"/> <br>
          <button type="submit">전송</button>
        </form>
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
</style>

