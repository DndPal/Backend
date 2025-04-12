import { Module, Provider } from "@nestjs/common";
import { AuthenticationDiTokens } from "./di/authentication-tokens.di";
import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";
import { LoginUserService } from "./services/login-user.service";
import { UserDiTokens } from "src/user/di/user-tokens.di";
import { AuthenticationController } from "./controllers/authentication.controller";
import { UsersModule } from "src/user/user.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { ValidateUserService } from "./services/validate-user.service";
import { PassportModule } from "@nestjs/passport";
import { ValidateUserUseCase } from "./services/usecases/validate-user.usecase";
import { SaveSessionUseCase } from "./services/usecases/save-session.usecase";
import { Session } from "./entities/session.entity";
import { DataSource, Repository } from "typeorm";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { SessionRepository } from "./repositories/mysql/session.repository";
import { SessionRepositoryInterface } from "./repositories/session-repository.interface";
import { SaveSessionService } from "./services/save-session.service";
import { ValidateSessionUseCase } from "./services/usecases/validate-session.usecase";
import { SessionStrategy } from "./strategies/session.strategy";
import { ValidateSessionService } from "./services/validate-session.service";
import { FindSessionByIdUseCase } from "./services/usecases/find-session-by-id.usecase";
import { UpdateLogOutStateUseCase } from "./services/usecases/update-log-out-state.usecase";
import { UpdateLogOutStateService } from "./services/update-log-out-state.service";
import { LogOutService } from "./services/log-out.service";
import { FindSessionByIdService } from "./services/find-session-by-id.service";
import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";
import { RegisterUserService } from "./services/register-user.service";
import { SessionAuthorizationGuard } from "./guards/session-authorization.guard";
import { APP_GUARD } from "@nestjs/core";
import { LogOutUseCase } from "./services/usecases/log-out.usecase";
import { FindUserBySessionIdService } from "./services/find-user-by-session-id.service";

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
        useFactory: (findByUsernameService: FindByUsernameUseCase) => new ValidateUserService(findByUsernameService),
        inject: [UserDiTokens.FindUserByUsernameService]
    },
    {
        provide: AuthenticationDiTokens.SaveSessionService,
        useFactory: (sessionRepository: SessionRepositoryInterface) => new SaveSessionService(sessionRepository),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.LoginUserService,
        useFactory: (findByUsernameService: FindByUsernameUseCase, saveSessionService: SaveSessionUseCase) => new LoginUserService(saveSessionService, findByUsernameService),
        inject: [UserDiTokens.FindUserByUsernameService, AuthenticationDiTokens.SaveSessionService]
    },
    {
        provide: AuthenticationDiTokens.ValidateSessionService,
        useFactory: (findSessionByIdService: FindSessionByIdUseCase, logOutService: LogOutUseCase) => new ValidateSessionService(findSessionByIdService, logOutService),
        inject: [AuthenticationDiTokens.FindSessionByIdService, AuthenticationDiTokens.LogOutService]
    },
    {
        provide: AuthenticationDiTokens.LogOutService,
        useFactory: (updateLogOutStateService: UpdateLogOutStateUseCase) => new LogOutService(updateLogOutStateService),
        inject: [AuthenticationDiTokens.UpdateLogOutStateService]
    },
    {
        provide: AuthenticationDiTokens.UpdateLogOutStateService,
        useFactory: (sessionRepository: SessionRepositoryInterface) => new UpdateLogOutStateService(sessionRepository),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.FindSessionByIdService,
        useFactory: (sessionRepository: SessionRepositoryInterface) => new FindSessionByIdService(sessionRepository),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.RegisterUserService,
        useFactory: (saveUserService: SaveUserUseCase, findByUsernameService: FindByUsernameUseCase) => new RegisterUserService(saveUserService, findByUsernameService),
        inject: [UserDiTokens.SaveUserService, UserDiTokens.FindUserByUsernameService]
    },
    {
        provide: AuthenticationDiTokens.FindUserBySessionIdService,
        useFactory: (findSessionByIdService: FindSessionByIdUseCase) => new FindUserBySessionIdService(findSessionByIdService),
        inject: [AuthenticationDiTokens.FindSessionByIdService]
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
    controllers: [AuthenticationController],
    providers: [
        ...serviceProviders, 
        ...strategyProviders, 
        ...repositoryProviders,
        {
            provide: APP_GUARD,
            useClass: SessionAuthorizationGuard
        }
    ],
    exports: [
        AuthenticationDiTokens.FindUserBySessionIdService
    ]
})

export class AuthenticationModule {}