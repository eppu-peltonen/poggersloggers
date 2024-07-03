import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { DataSource } from "typeorm";
import { CreateUserDto } from "../dto/create-user-dto";
import { GetUserDto } from "../dto/get-user-dto";
import * as bcrypt from "bcrypt";
import { Result, ResultWithValue } from "../result";


@Injectable()
export class UsersService {

    constructor(private readonly dataSource: DataSource) {}

    async findByUsername(username: string): Promise<ResultWithValue<GetUserDto>> {
        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username } });

        if (!user) {
            return ResultWithValue.fail("User not found");
        }

        return ResultWithValue.ok(new GetUserDto(user));
    }

    async findUserforLogin(username: string): Promise<ResultWithValue<User>> {
        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username } });

        if (!user) {
            return ResultWithValue.fail("User not found");
        }

        return ResultWithValue.ok(user);
    }

    async create(userToCreate: CreateUserDto): Promise<Result> {

        var user = await this.dataSource
            .getRepository(User)
            .findOne({ where: { username: userToCreate.username } });

        if (user) {
            return Result.fail("User already exists");
        }

        var passwordHash = await bcrypt.hash(userToCreate.password, 10);
    
        var result = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: userToCreate.username,
                passwordHash: passwordHash,
                createdAt: new Date(),
            })
            .execute();

        if (result.identifiers.length === 0) {
            return Result.fail("Failed to create user");
        }

        return Result.ok();
    }
}
