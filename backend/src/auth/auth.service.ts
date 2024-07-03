
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ResultWithValue } from "../result";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(username: string, password: string): Promise<ResultWithValue<{access_token: string}>> {
        const user = await this.usersService.findUserforLogin(username);

        const isPasswordCorrect = await bcrypt.compare(password, user.value.passwordHash);

        if (!isPasswordCorrect) {
            return ResultWithValue.fail("Invalid password");
        }
        
        const payload = { sub: user.value.id, username: user.value.username };

        return ResultWithValue.ok({
            access_token: this.jwtService.sign(payload),
        });
    }
}
