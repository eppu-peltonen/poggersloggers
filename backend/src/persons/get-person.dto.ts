import { Person } from './person.entity';

export class GetPersonDto {

    constructor(person: Person) {
        this.username = person.username;
        this.createdAt = person.createdAt;
    }

    username: string;
    createdAt: Date;
}