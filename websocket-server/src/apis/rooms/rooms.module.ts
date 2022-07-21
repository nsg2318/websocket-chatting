import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsUsersModule } from "../roomsusers/roomsUsers.module";
import { UserModule } from "../users/users.module";
import { Room } from "./entities/room.entity";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";

@Module({
  imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => RoomsUsersModule), UserModule],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsRepository, RoomsService],
})
export class RoomsModule{}
