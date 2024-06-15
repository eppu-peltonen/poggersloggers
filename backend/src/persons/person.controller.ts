import { Controller, Get, Body, Query, Post, HttpCode} from "@nestjs/common";
import { PersonService } from "./person.service";
import { CreatePersonDto } from "./create-person.dto";
import { InsertResult } from "typeorm";
import { GetPersonDto } from "./get-person.dto";
import { Result } from "../result"

@Controller("api/Person")
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    findUser(@Query("username") username: string): Result<GetPersonDto> {
        throw new Error("Method not implemented.");
    }

    @Post("Create")
    createUser(@Body() personToCreate: CreatePersonDto): Promise<InsertResult> {
        return this.personService.create(personToCreate);
    }
}