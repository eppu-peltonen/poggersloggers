import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { DataSource } from "typeorm";
import { CreateUserDto } from "../dto/create-user-dto";
import { GetUserDto } from "../dto/get-user-dto";
import * as bcrypt from "bcrypt";
import { ApiResponse } from "src/interfaces";

@Injectable()
export class UsersService {

    constructor(private readonly dataSource: DataSource) {}

    async findByUsername(username: string): Promise<GetUserDto> {
        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username } });

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        return new GetUserDto(user);
    }

    async findUserforLogin(username: string): Promise<User> {
        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username } });

        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(userToCreate: CreateUserDto): Promise<ApiResponse> {

        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username: userToCreate.username } });

        if (user) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        }

        var passwordHash = await bcrypt.hash(userToCreate.password, 10);
    
        var insertResult = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: userToCreate.username,
                passwordHash: passwordHash,
                createdAt: new Date(),
            })
            .execute();

        if (insertResult.identifiers.length === 0) {
            throw new HttpException("User not created", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        var response: ApiResponse = {
            code: HttpStatus.CREATED,
            description: "User created",
        };

        return response;
    }
}
