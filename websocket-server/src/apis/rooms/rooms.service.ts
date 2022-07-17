import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RoomsRepository } from "./rooms.repository";

@Injectable()
export class RoomsService {

    constructor(
        private readonly roomsRepository: RoomsRepository
    ){}

    async saveIfNotExist(name: string){
        if(!name){
            throw new UnauthorizedException('방이름을 입력해주세요.'); 
        }

        const room = await this.roomsRepository.findByName(name);
        if(!room){
            return await this.roomsRepository.saveByName(name);
        } else {
            return room;
        }
    }
    
}