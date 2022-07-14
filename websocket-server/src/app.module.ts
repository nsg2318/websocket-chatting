import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { MessagesModule } from './web-socket/messages/messages.module';
import { RoomsModule } from './web-socket/rooms/rooms.module';

@Module({
  imports: [MessagesModule, RoomsModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
