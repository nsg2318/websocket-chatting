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
    
    async createIfNotExists(name: string) {
        const findRoom = await this.roomRepository.findOne({where: {name: name}});
        console.log(`findRoom : ${findRoom}`);
        if(!findRoom){
            const saveRoom: Room =this.roomRepository.create({name});
            return this.roomRepository.save(saveRoom);
        } else {
            return findRoom;
        }
    }

    async findById(roomId: number) {
        return await this.roomRepository.findOne({where: {id: roomId}});
    }
}