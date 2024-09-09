
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ApiLoginResponse } from "../interfaces";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(username: string, password: string): Promise<ApiLoginResponse> {
        const user = await this.usersService.findUserforLogin(username);

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordCorrect) {
            throw new HttpException("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
        
        const payload = { sub: user.id, username: user.username };

        var token = this.jwtService.sign(payload, { expiresIn: "1h" });

        var response: ApiLoginResponse = {
            code: HttpStatus.OK,
            description: "Logged in as " + user.username,
            token: token,
        };

        return response;
    }
}
