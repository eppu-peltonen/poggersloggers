import { Controller, Get, Body, Query, Post, HttpCode} from "@nestjs/common";
import { PersonService } from "./person.service";
import { CreatePersonDto } from "./create-person.dto";
import { InsertResult } from "typeorm";
import { GetPersonDto } from "./get-person.dto";
import { ResultWithValue } from "../result"

@Controller("api/person")
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    findUser(@Query("username") username: string): Promise<ResultWithValue<GetPersonDto>> {
        return this.personService.findByUsername(username);
    }

    @Post("create")
    createUser(@Body() personToCreate: CreatePersonDto): Promise<InsertResult> {
        return this.personService.create(personToCreate);
    }
}