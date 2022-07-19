import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsModule } from "../rooms/rooms.module";
import { UserModule } from "../users/users.module";
import { RoomUser } from "./entities/roomuser.entity";
import { RoomsUsersController } from "./roomsUsers.controller";
import { RoomsUsersRepository } from "./roomsUsers.repository";
import { RoomsUsersService } from "./roomsUsers.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoomUser]),UserModule, RoomsModule],
  controllers: [RoomsUsersController],
  providers: [RoomsUsersService, RoomsUsersRepository],
})
export class RoomsUsersModule{}