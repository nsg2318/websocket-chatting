# websocket-chatting
### 목표1 : 여러개 Rooms에서 각 User끼리 채팅이 가능한 애플리케이션 구현 (socket.io사용)
### 2022.07.15 목표 1 기능구현 완료

### 목표2 : room 생성과 동시에 emit 구현 (DB사용이 아닌, socket 통신으로)

## Frontend
- Vue.js@3.2.37
- socket.io-client
- axios
- javascript

## Backend
- typescript
- NodeJs(v16.16.0)
- NestJs(v9.0.0)
- socket.io
- @nestjs/websockets 
- @nestjs/platform-socket.io
- typeORM [+mysql]
