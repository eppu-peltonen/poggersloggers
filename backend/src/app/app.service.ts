import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): {message: string} {
        return {message: "hello from api, server time: " + new Date().toISOString() + " UTC"};
    }
}
