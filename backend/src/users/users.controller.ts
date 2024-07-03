import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';

@Controller("api/users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("create")
    create(@Body() createUser: CreateUserDto) {
        return this.usersService.create(createUser);
    }
}
