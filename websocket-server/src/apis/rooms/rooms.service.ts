import { Injectable } from "@nestjs/common";
import { RoomsRepository } from "./rooms.repository";

@Injectable()
export class RoomsService {

    constructor(
        private readonly roomsRepository: RoomsRepository
    ){}

    async joinRoom(name: string){
        return await this.roomsRepository.createIfNotExists(name);
    }
    
}