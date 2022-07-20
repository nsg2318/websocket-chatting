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
  //참여중인 방 목록 조회
  const rooms = ref([]);
  const roomName = ref('');
  
  //참여중인 방 id 
  const roomId = ref('');
  //참여 여부
  const joinedRoom = ref(false);  
  
  
  //user
  const joined = ref(false);
  const userId = ref('');
  const userName = ref('');
  
  
  const modalToggle = ref(false);
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


  const joinRoom = (id, name) => {
    roomId.value = id;
    roomName.value = name;
    socket.emit('joinRoom', {roomId: roomId.value}, response => {
      joinedRoom.value = true;
      findMessageByRoom();
    })
  }

  const saveSocketId = () => {
    socket.emit('saveSocketId', {userId: userId.value});
  }
  //api
  const user = () => {
    axios.post(`${apiUrl}/user`, {
      userName: userName.value
    }).then((response) => {
      userId.value = response.data.id;
      joined.value = true;
      saveSocketId();
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

  const createRoom = () => {
    axios.post(`${apiUrl}/room`, {
      createRoomDto: {
        roomName: roomName.value,
        hostName: userName.value
      }
    }).then((response) => {
      roomListByUserId(userId.value);
      // user();
    }).catch((error) => {
      alert(error);
    });
  }

  const exitRoom = () => {
    joinedRoom.value = false;
  }
  
  const roomToggle = () => {
    modalToggle.value = !modalToggle.value;
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
          <input v-model="userName"/><br>
          <button type="submit">제출</button>
          </form>
        </div>
      </div>
      <div v-else>
        <div class="room-container">
          <div class="roomHeader">=============================== 참여중인 채팅방 목록 ================================</div><br>
          <div class="roomList">[방번호]</div>
          <div class="roomList">[방이름]</div>
          <div class="hostList">[방주인]</div>
          <div v-for="room in rooms">
           <div class = "roomList">[{{room.id}}]</div>
           <div class = "roomList">[{{room.room.name}}]</div>
           <div class = "hostList">[{{room.room.hostName}}]</div>
           <button v-on:click="joinRoom(room.id,room.room.name)">입장하기</button>
          </div><br><br><br>
          <form @submit.prevent="createRoom">
          <input v-model="roomName"/><br>
          <h3 class="white">Room 생성하기. Room 이름을 입력하세요.</h3>
          <br>
          <button type="submit">제출</button>
          <button @click="roomToggle()" type="button">
          모달창 띄우기
          </button>
          </form>

          <div v-if="!modalToggle">
            <h5> 하이루 . </h5>
            <button @click="roomToggle()" type="button">확인</button>
          </div>

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
          <button v-on:click="exitRoom()">나가기</button>
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
  width: 300vh;
}

.roomHeader{
  margin: 15px 0px 10px;
  position: a;
  border: none;
  display: inline-block;
  padding: 0px 0px 0px 0px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  font-size: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}

.chat-container{
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container{
  flex: 1;
}

.roomList{
  margin: 15px 0px 10px;
  width: 200px;
  position: a;
  border: none;
  display: inline-block;
  padding: 0px 0px 0px 0px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  font-size: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}

.hostList{
  margin: 15px 0px 10px;
  position:relative;
  border: none;
  display: inline-block;
  padding: 0px 300px 0px 0px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  font-size: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  text-align: right;
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
  margin: 15px 10px 10px;
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

