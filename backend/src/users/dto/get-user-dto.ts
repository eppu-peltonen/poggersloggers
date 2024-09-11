import { PartialType } from "@nestjs/mapped-types";
import { User } from "../users.entity"
import { UserDto } from "./user-dto";

export class GetUserDto extends PartialType(UserDto) {

    username: string;
    createdAt: Date;

    constructor(user: User) {
        super();
        this.username = user.username;
        this.createdAt = user.createdAt;
    }
}