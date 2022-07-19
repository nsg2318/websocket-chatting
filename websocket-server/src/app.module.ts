import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/users/users.module';
import { typeORMConfig } from './configs/typeorm.config';
import { MessagesModule } from './web-socket/messages/messages.module';
import { RoomsModule } from './apis/rooms/rooms.module';
import { RoomsUsersModule } from './apis/roomsusers/roomsUsers.module';

@Module({
  imports: [MessagesModule, RoomsModule, UserModule,RoomsUsersModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
