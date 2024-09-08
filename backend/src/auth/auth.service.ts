
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(username: string, password: string): Promise<{access_token: string}> {
        const user = await this.usersService.findUserforLogin(username);

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordCorrect) {
            throw new HttpException("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
        
        const payload = { sub: user.id, username: user.username };

        return {access_token: this.jwtService.sign(payload)};
    }
}
