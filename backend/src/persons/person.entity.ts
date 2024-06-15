import {Entity, PrimaryGeneratedColumn, Column, Generated} from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    
    @Column()
    username: string;
    
    @Column()
    passwordHash: string;

    @Column()
    @Generated("uuid")
    memberId: string;

    @Column()
    createdAt: Date;
}