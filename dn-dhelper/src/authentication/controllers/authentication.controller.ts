import { Controller, Post, UseGuards, Request, Inject, Patch, Body, Get } from "@nestjs/common";
import { LocalAuthenticationGuard } from "../guards/local-authentication.guard";
import { LoginUserUseCase } from "../services/usecases/login-user.usecase";
import { AuthenticationDiTokens } from "../di/authentication-tokens.di";
import { LogOutPort, LogOutUseCase } from "../services/usecases/log-out.usecase";
import { SessionAuthorizationGuard } from "../guards/session-authorization.guard";
import { FindSessionByIdPort, FindSessionByIdUseCase } from "../services/usecases/find-session-by-id.usecase";
import { ValidateSessionPort, ValidateSessionUseCase } from "../services/usecases/validate-session.usecase";

@Controller('authentication')
export class AuthenticationController {
    constructor(
        @Inject(AuthenticationDiTokens.LoginUserService)
        private readonly loginUserService: LoginUserUseCase,
        @Inject(AuthenticationDiTokens.LogOutService)
        private readonly logOutService: LogOutUseCase,
        @Inject(AuthenticationDiTokens.FindSessionByIdService)
        private readonly findSessionByIdService: FindSessionByIdUseCase,
        @Inject(AuthenticationDiTokens.ValidateSessionService)
        private readonly validateSessionService: ValidateSessionUseCase
    ) {}

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async login(@Request() req) {
        const sessionId = await this.loginUserService.execute(req.user);
        return { sessionId: sessionId };
    }

    @UseGuards(SessionAuthorizationGuard)
    @Patch('logout')
    async logOut(@Body() payload: LogOutPort) {
        await this.logOutService.execute(payload)
        return { message: "Logged out" };
    }
    
    @Get('findById')
    async findById(
        @Body() payload: FindSessionByIdPort
    ) {
        return await this.findSessionByIdService.execute(payload);
    }

    @UseGuards(SessionAuthorizationGuard)
    @Get('validate')
    async validate(
        @Request() req
    ) {
        return await this.validateSessionService.execute(req.sessionId);
    }
}