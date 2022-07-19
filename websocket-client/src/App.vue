<script setup>
  import axios from 'axios';
  import { io } from 'socket.io-client';
  import { ref } from 'vue';
  
  //connection
  const apiUrl = 'http://localhost:3001';
  const socket = io(apiUrl);
  
  //message
  const messages = ref([]);
  const messageText = ref('');
  
  //room 
  const rooms = ref([]);
  const roomName = ref('');
  const roomId = ref('');
  const joinedRoom = ref(false);
  
  //user
  const joined = ref(false);
  const userId = ref('');
  const userName = ref('');
  
  
  //Websocket
  socket.on('message', (message) => {
        messages.value.push(message);
      })


  const findMessageByRoom = () => {
    socket.emit('findAllMessageByRoomId',{roomId: roomId.value},response => {
      messages.value = response;
    });
  }

  const sendMessage = () => {
    socket.emit('createMessage',{ roomId: roomId.value, text: messageText.value, userName: userName.value }, response => {
      messageText.value ='';
    })
  }


  const joinRoom = () => {
    socket.emit('joinRoom', { roomId: roomId.value}, response => {
      joined.value = true;
      findMessageByRoom();
    })
  }

  //api
  const user = () => {
    axios.post(`${apiUrl}/user`, {
      userName: userName.value
    }).then((response) => {
      userId.value = response.data.id;
      joined.value = true;
      roomListByUserId(userId.value);
    }).catch((error) => console.log(error));
  }

  const roomListByUserId = (userId) => {
    axios.get(`${apiUrl}/roomUser/${userId}`,{})
      .then((response) => {
        rooms.value = response.data;
        // console.log(`rooms.value : ${rooms.value}`);
      });
  }

  const room = () => {
    axios.post(`${apiUrl}/room`, {
      createRoomDto: {
        roomName: roomName.value,
        hostName: userName.value
      }
    }).then((response) => {
      roomId.value = response.data.id;
      roomListByUserId(userId.value);
      // user();
    }).catch((error) => {
      alert(error);
    });
  }

  const signIn = () => {
    axios.post(`${apiUrl}/roomUser/${userId}`);
  }

</script>

<template>
  <div class="chat">
    <div v-if="!joinedRoom">
      <div v-if="!joined">
        <div class="identify">
          <h1 class="green">WebSocket Chatting v1.1.24</h1>
          <form @submit.prevent="user">
          <h3 class="white">닉네임을 입력하세요. 이 작업은 회원가입 또는 로그인을 진행합니다.</h3>
          <input v-model="userName"/><br><br>
          <button type="submit">제출</button>
          </form>
        </div>
      </div>
      <div v-else>
        <div class="room-container">
          ==========참여중인 채팅방 목록 ==========
          <div v-for="room in rooms">
            [{{room.id}}] [{{room.room.name}}] [{{room.room.hostName}}]
          </div>
          <form @submit.prevent="room">
          <h3 class="white">Room 생성하기. Room 이름을 입력하세요.</h3>
          <input v-model="roomName"/><br>
          <button type="submit">제출</button>
          </form>

        </div>
      </div>
    </div>
    <div class="chat-container" v-else>
      <div class="messages-container" v-bind:roomName="[roomName.value]" >
        ========채팅방이 생성되었습니다. 방이름 : {{roomName}}========
        <div v-for="message in messages">
          [{{message.customDate}}][{{ message.userName }}] : {{message.text}}
        </div>
      </div>
      <div class="message-input">
        <form @submit.prevent="sendMessage">
          <input v-model="messageText"/> <br>
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

