import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomsService } from "./rooms.service";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: {
  origin: '*',
  },
})
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService){}
  
}