import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { ApiResponse } from "src/interfaces";

@Controller("api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("create")
    @ApiCreatedResponse({ description: "User created" })
    create(@Body() createUser: CreateUserDto): Promise<ApiResponse> {
        return this.usersService.create(createUser);
    }
}
