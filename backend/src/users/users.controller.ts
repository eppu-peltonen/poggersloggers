import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Post, Body } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user-dto";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("create")
    @ApiOkResponse({ description: "User created" })
    create(@Body() createUser: CreateUserDto): Promise<void> {
        return this.usersService.create(createUser);
    }
}
