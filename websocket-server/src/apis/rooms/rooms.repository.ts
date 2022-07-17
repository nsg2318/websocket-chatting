import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "./entities/room.entity";

@Injectable()
export class RoomsRepository{

    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ){}
    
    async saveByName(name: string) {
        const saveRoom: Room =this.roomRepository.create({name});
        return await this.roomRepository.save(saveRoom);    
    }

    async findByName(roomName: string) {
        return await this.roomRepository.findOne({where: {name: roomName}});
    }

    async findById(roomId: number) {
        return await this.roomRepository.findOne({where: {id: roomId}});
    }
}