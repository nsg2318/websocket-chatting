import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RoomsUsersRepository } from "../roomsusers/roomsUsers.repository";
import { User } from "../users/entities/user.entity";
import { UsersRepository } from "../users/users.repository";
import { CreateRoomDto } from "./dto/create-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsRepository } from "./rooms.repository";

@Injectable()
export class RoomsService {

    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly roomsUsersRepository: RoomsUsersRepository
    ){}

    async save(createRoomDto: CreateRoomDto){
        const {roomName, hostName, participants} = createRoomDto;
        if(!roomName){
            throw new UnauthorizedException('방이름을 입력해주세요.'); 
        }
        
        //todo : error handling 
        const room = await this.roomsRepository.findByName(roomName);
        if(room) {
            throw new UnauthorizedException('이미 존재하는 방이름입니다.');
        }

        const createdRoom: Room = await this.roomsRepository.save(roomName,hostName);
        const user: User = await this.usersRepository.findByName(hostName);
        await this.roomsUsersRepository.save(user,createdRoom);

        // todo : Promise.all
        for(const participant of participants) {
            const user: User = await this.usersRepository.findByName(participant);
            await this.roomsUsersRepository.save(user,createdRoom);
        }

        return createdRoom;

    }
    
}