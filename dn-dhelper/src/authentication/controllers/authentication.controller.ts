import { Controller, Post, UseGuards, Request, Inject, Patch, Body } from "@nestjs/common";
import { LocalAuthenticationGuard } from "../guards/local-authentication.guard";
import { LoginUserPort, LoginUserUseCase } from "../services/usecases/login-user.usecase";
import { AuthenticationDiTokens } from "../di/authentication-tokens.di";
import { LogOutUseCase } from "../services/usecases/log-out.usecase";
import { RegisterUserPort, RegisterUserUseCase } from "../services/usecases/register-user.usecase";
import { Public } from "../metadata/public.metadata";

@Controller('authentication')
export class AuthenticationController {
    constructor(
        @Inject(AuthenticationDiTokens.LoginUserService)
        private readonly loginUserService: LoginUserUseCase,
        @Inject(AuthenticationDiTokens.LogOutService)
        private readonly logOutService: LogOutUseCase,
        @Inject(AuthenticationDiTokens.RegisterUserService)
        private readonly registerUserService: RegisterUserUseCase
    ) {}

    @Public()
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(
        @Body() payload: LoginUserPort
    ) {
        const sessionId = await this.loginUserService.execute(payload);
        
        return { sessionId: sessionId };
    }

    @Patch('logout')
    async logOut(
        @Request() req
    ) {
        const sessionId = req.headers['authorization'];

        await this.logOutService.execute({ sessionId: sessionId });

        return { message: "Logged out sucessfully" };
    }

    @Public()
    @Post('register')
    async registerUser(
        @Body() payload: RegisterUserPort
    ) {
        await this.registerUserService.execute(payload)

        return { message: "Registered succesfully" }
    }
}
