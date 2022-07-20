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
  const socketUser = ref([]);
  const selectedSocket = ref([]);

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

//현재 연결이 성립된 소켓id로 유저name리턴
  const getAllSocketUser = () => {
   socket.emit('getAllSocketUser', {}, response => {
      socketUser.value;
      socketUser.value = response;
      console.log(socketUser.value);
      modalToggle.value = !modalToggle.value;
    });
  }

  const joinRoom = (id, name) => {
    roomId.value = id;
    roomName.value = name;
    socket.emit('joinRoom', {roomId: roomId.value}, response => {
      joinedRoom.value = true;
      findMessageByRoom();
    });
  }

  const saveSocketId = (id) => {
    socket.emit('saveSocketId',{userId: id});
  }
  //api
  const user = () => {
    axios.post(`${apiUrl}/user`, {
      userName: userName.value
    }).then((response) => {
      userId.value = response.data.id;
      joined.value = true;
      roomListByUserId(userId.value);
      saveSocketId(userId.value);
    }).catch((error) => console.log(error));
  }

  const roomListByUserId = (userId) => {
    axios.get(`${apiUrl}/roomUser/${userId}`,{})
      .then((response) => {
        rooms.value = response.data;
        // console.log(`rooms.value : ${rooms.value}`);
      });
  }

  const temp_show = () => {
    console.log(selectedSocket.value);
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
          <h1 class="green">WebSocket Chatting v2.1.3</h1>
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
          <!-- <input v-model="roomName"/><br> -->
          <!-- <h3 class="white">Room 생성하기. Room 이름을 입력하세요.</h3> -->
          <!-- <br> -->
          <!-- <button type="submit">제출</button> -->
          <button v-on:click="getAllSocketUser()" type="button">
          채팅방 생성하기
          </button>
          </form>
          <div v-if="modalToggle">
            <div class="modal_box">
              <h5> 현재 연결된 유저목록 </h5><br>
              <div class="modal_list">
                <div v-for="user in socketUser">
                  {{user.name}}
                </div>
              </div>
              <!-- todo: 체크된 유저명 기반으로 방만들기 -->
              <div class="roomName">유저추가</div>
              <input v-model="roomName"/>
              <div class="userName">
                  추가된 유저목록 : {{selectedSocket.value}}
                </div>
              <button @click="temp_show()" type="button">만들기</button>
              <button @click="roomToggle()" type="button">취소</button>
            </div>
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
  height: 200vh;
  width: 200vh;
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

.roomName{
  font-size: 25px;
  color: white;
}
 .modal_box {
  margin: 15px 0px 10px;
  position: relative;
  display: block;
  z-index: 200;
  top: 20%;
  left: 10%;
  width: 30%;
  background: grey;
  padding: 1rem;
  border: 4px solid #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  font-size: 30px;
  color: black;
  font-weight: bold;
}

.modal_list{
  width: 250px;
  position: relative;
  border: none;
  font-size: 25px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.model_list_checkbox {
  transform: scale(0.8);
  padding: 0px 0px 0px 150px;
  top: -35px;
}

.roomList{
  margin: 15px 0px 10px;
  width: 200px;
  position: relative;
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

