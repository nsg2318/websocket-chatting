import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from 'src/apis/rooms/rooms.module';
import { UserModule } from 'src/apis/users/users.module';
import { Message } from './entities/message.entity';
import { MessageRepository } from './meesages.repository';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]),UserModule,RoomsModule],
  providers: [MessagesGateway, MessagesService, MessageRepository]
})
export class MessagesModule {}
