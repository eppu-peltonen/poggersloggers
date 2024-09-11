import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiResponse } from "src/interfaces";

@Controller("api/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @ApiOkResponse({ description: "User logged in" })
    login(@Body() loginUser: LoginDto): Promise<ApiResponse> {
        return this.authService.login(loginUser.username, loginUser.password);
    }
}
