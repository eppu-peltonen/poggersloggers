import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Post, Body, Request, Get } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user-dto";

@Controller("api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("create")
    create(@Body() createUser: CreateUserDto) {
        return this.usersService.create(createUser);
    }
}
