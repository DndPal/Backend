import { Module, Provider } from "@nestjs/common";
import { AuthenticationDiTokens } from "./di/authentication-tokens.di";
import { FindUserByUsernameUseCase } from "src/user/services/usecases/find-user-by-username.usecase";
import { LoginUserService } from "./services/login-user.service";
import { UserDiTokens } from "src/user/di/user-tokens.di";
import { AuthenticationController } from "./controllers/authentication.controller";
import { UsersModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { ValidateUserService } from "./services/validate-user.service";
import { PassportModule } from "@nestjs/passport";
import { ValidateUserUseCase } from "./services/usecases/validate-user.usecase";
import { Session } from "./entities/session.entity";
import { DataSource, Repository } from "typeorm";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { SessionRepository } from "./repositories/mysql/session.repository";
import { SessionRepositoryInterface } from "./repositories/session-repository.interface";
import { ValidateSessionUseCase } from "./services/usecases/validate-session.usecase";
import { SessionStrategy } from "./strategies/session.strategy";
import { ValidateSessionService } from "./services/validate-session.service";
import { LogOutService } from "./services/log-out.service";
import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";
import { RegisterUserService } from "./services/register-user.service";
import { SessionAuthorizationGuard } from "./guards/session-authorization.guard";
import { APP_GUARD } from "@nestjs/core";
import { LogOutUseCase } from "./services/usecases/log-out.usecase";
const repositoryProviders: Array<Provider> = [
    {
        provide: AuthenticationDiTokens.MySQLSessionRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: AuthenticationDiTokens.SessionRepositoryInterface,
        useFactory: (repository: Repository<Session>) => new SessionRepository(repository),
        inject: [AuthenticationDiTokens.MySQLSessionRepositoryInterface]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: AuthenticationDiTokens.ValidateUserService,
        useFactory: (findByUsernameService: FindUserByUsernameUseCase) => new ValidateUserService(findByUsernameService),
        inject: [UserDiTokens.FindUserByUsernameService]
    },
    {
        provide: AuthenticationDiTokens.LoginUserService,
        useFactory: (findUserByUsernameService: FindUserByUsernameUseCase, sessionRepository: SessionRepositoryInterface) => new LoginUserService(findUserByUsernameService, sessionRepository),
        inject: [UserDiTokens.FindUserByUsernameService, AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.ValidateSessionService,
        useFactory: (sessionRepository: SessionRepositoryInterface, logOutService: LogOutUseCase) => new ValidateSessionService(sessionRepository, logOutService),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface, AuthenticationDiTokens.LogOutService]
    },
    {
        provide: AuthenticationDiTokens.LogOutService,
        useFactory: (sessionRepository: SessionRepositoryInterface) => new LogOutService(sessionRepository),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.RegisterUserService,
        useFactory: (saveUserService: SaveUserUseCase, findByUsernameService: FindUserByUsernameUseCase) => new RegisterUserService(saveUserService, findByUsernameService),
        inject: [UserDiTokens.SaveUserService, UserDiTokens.FindUserByUsernameService]
    }
]

const strategyProviders: Array<Provider> = [
    {
        provide: AuthenticationDiTokens.LocalStrategy,
        useFactory: (validateUserService: ValidateUserUseCase) => new LocalStrategy(validateUserService),
        inject: [AuthenticationDiTokens.ValidateUserService]
    },
    {
        provide: AuthenticationDiTokens.SessionStrategy,
        useFactory: (validateSessionService: ValidateSessionUseCase) => new SessionStrategy(validateSessionService),
        inject: [AuthenticationDiTokens.ValidateSessionService]
    }
]

@Module({
    imports: [
        UsersModule, 
        PassportModule
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        ...serviceProviders, 
        ...strategyProviders, 
        ...repositoryProviders,
        {
            provide: APP_GUARD,
            useClass: SessionAuthorizationGuard
        }
    ],
})

export class AuthenticationModule {}