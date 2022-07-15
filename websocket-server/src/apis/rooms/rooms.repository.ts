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
        const findRoom = await this.roomRepository.find({where: {name: name}});
        console.log(`findRoom : ${findRoom}`);
        if(findRoom.length == 0){
            const saveRoom: Room =this.roomRepository.create({name});
            return this.roomRepository.save(saveRoom);
        } else {
            console.log('엘스');
            return findRoom;
        }
    }
}