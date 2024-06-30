import { Injectable } from "@nestjs/common";
import { Person } from "./person.entity";
import { DataSource } from "typeorm";
import { CreatePersonDto } from "./create-person.dto";
import { InsertResult } from "typeorm";
import { GetPersonDto } from "./get-person.dto";
import * as bcrypt from "bcrypt";
import { Result, ResultWithValue } from "../result";

@Injectable()
export class PersonService {

  constructor(private readonly dataSource: DataSource) {}

    async findByUsername(username: string): Promise<ResultWithValue<GetPersonDto>> {
        var person = await this.dataSource
            .getRepository(Person)
            .findOne({ where: { username } });

        if (!person) {
            return ResultWithValue.fail("Person not found");
        }

        return ResultWithValue.ok(new GetPersonDto(person));
    }

    async create(personToCreate: CreatePersonDto): Promise<InsertResult> {

        var passwordHash = await bcrypt.hash(personToCreate.password, 10);
        
        return await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Person)
            .values({
                username: personToCreate.username,
                passwordHash: passwordHash,
                createdAt: new Date(),
            })
            .execute();

        
    }
}
