import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    createdDate: Date;
    name: string;
}
