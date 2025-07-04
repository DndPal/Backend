import { Controller, Post, UseGuards, Request, Inject, Patch, Body } from "@nestjs/common";
import { LocalAuthenticationGuard } from "../guards/local-authentication.guard";
import { LoginUserPort, LoginUserUseCase } from "../services/usecases/login-user.usecase";
import { AuthenticationDiTokens } from "../di/authentication-tokens.di";
import { LogOutUseCase } from "../services/usecases/log-out.usecase";
import { RegisterUserPort, RegisterUserUseCase } from "../services/usecases/register-user.usecase";
import { Public } from "../metadata/public.metadata";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserServiceResponseDto } from "../dto/login-user-service-response.dto";

@ApiTags('Authentication')
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
    @ApiOperation({ summary: 'Log in user' })
    @ApiResponse({ status: 200, description: 'User logged in succesfully', type: LoginUserServiceResponseDto })
    async login(
        @Body() payload: LoginUserPort
    ): Promise<LoginUserServiceResponseDto> {
        const sessionId = await this.loginUserService.execute(payload);
        
        return {
            sessionId: sessionId
        };
    }

    @Patch('logout')
    @ApiOperation({ summary: 'Log out user' })
    @ApiResponse({ status: 200, description: 'User logged out succesfully' })
    async logOut(
        @Request() req
    ) {
        const sessionId = req.headers['authorization'];

        await this.logOutService.execute({ sessionId: sessionId });

        return { message: "Logged out sucessfully" };
    }

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: 200, description: 'User registered succesfully' })
    async registerUser(
        @Body() payload: RegisterUserPort
    ) {
        await this.registerUserService.execute(payload)

        return { message: "Registered succesfully" }
    }
}
