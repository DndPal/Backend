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
        inject: [UserDiTokens.FindByUsernameService]
    },
    {
        provide: AuthenticationDiTokens.SaveSessionService,
        useFactory: (sessionRepository: SessionRepositoryInterface) => new SaveSessionService(sessionRepository),
        inject: [AuthenticationDiTokens.SessionRepositoryInterface]
    },
    {
        provide: AuthenticationDiTokens.LoginUserService,
        useFactory: (findByUsernameService: FindByUsernameUseCase, saveSessionService: SaveSessionUseCase) => new LoginUserService(saveSessionService, findByUsernameService),
        inject: [UserDiTokens.FindByUsernameService, AuthenticationDiTokens.SaveSessionService]
    }
]

const strategyProviders: Array<Provider> = [
    {
        provide: AuthenticationDiTokens.LocalStrategy,
        useFactory: (validateUserService: ValidateUserUseCase) => new LocalStrategy(validateUserService),
        inject: [AuthenticationDiTokens.ValidateUserService]
    }
]




@Module({
    imports: [UsersModule, PassportModule],
    controllers: [AuthenticationController],
    providers: [...serviceProviders, ...strategyProviders, ...repositoryProviders]
})

export class AuthenticationModule {}