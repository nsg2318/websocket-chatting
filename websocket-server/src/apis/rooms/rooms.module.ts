import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./entities/room.entity";
import { RoomsController } from "./rooms.controller";
import { RoomsRepository } from "./rooms.repository";
import { RoomsService } from "./rooms.service";

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsRepository],
})
export class RoomsModule{}
