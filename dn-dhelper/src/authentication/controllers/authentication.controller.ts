import { Controller, Post, UseGuards, Request, Inject } from "@nestjs/common";
import { LocalAuthenticationGuard } from "../guards/local-authentication.guard";
import { LoginUserUseCase } from "../services/usecases/login-user.usecase";
import { AuthenticationDiTokens } from "../di/authentication-tokens.di";

@Controller('authentication')
export class AuthenticationController {
    constructor(
        @Inject(AuthenticationDiTokens.LoginUserService)
        private readonly loginUserService: LoginUserUseCase
    ) {}

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.loginUserService.execute(req.user);
    }
}