# websocket-chatting
### 목표1 : 여러개 Rooms에서 각 User끼리 채팅이 가능한 애플리케이션 구현 (socket.io사용)
### nestJS 활용 목적으로 Vue.js 프레임워크는 깊게 고민하지 않는다.
### 2022.07.15 목표 1 기능구현 완료

### 목표2 : room 생성과 동시에 emit 구현 (DB사용이 아닌, socket 통신으로)
- 유저, 방생성 기능 분리
- 유저 로그인(또는 회원가입)시 소속중인 방 리스트 출력
- 방 관련 기능 개발(생성, 입장)
- 채팅 구현
- 관련 DB 개발
- 방 나감 기능 예정

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
