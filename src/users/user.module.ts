import { Module, Provider } from "@nestjs/common";
import { UserDiTokens } from "./di/user-tokens.di";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { UserRepository } from "./repositories/mysql/user.repository";
import { UserRepositoryInterface } from "./repositories/user-repository.interface";
import { SaveUserService } from "./services/save-user.service";
import { UserController } from "./controllers/user.controller";
import { RemoveUserService } from "./services/remove-user.service";
import { FindByUsernameService } from "./services/find-user-by-username.service";
import { FindUserByIdService } from "./services/find-user-by-id.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: UserDiTokens.MySQLUserRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: UserDiTokens.UserRepositoryInterface,
        useFactory: (repository: Repository<User>) => new UserRepository(repository),
        inject: [UserDiTokens.MySQLUserRepositoryInterface]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: UserDiTokens.SaveUserService,
        useFactory: (
            userRepository: UserRepositoryInterface
        ) => new SaveUserService(userRepository),
        inject: [
            UserDiTokens.UserRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.RemoveUserService,
        useFactory: (
            userRepository: UserRepositoryInterface
        ) => new RemoveUserService(userRepository),
        inject: [
            UserDiTokens.UserRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.FindUserByUsernameService,
        useFactory: (
            userRepository: UserRepositoryInterface
        ) => new FindByUsernameService(userRepository),
        inject: [
            UserDiTokens.UserRepositoryInterface
        ]
    },
    {
        provide: UserDiTokens.FindUserByIdService,
        useFactory: (
            userRepository: UserRepositoryInterface
        ) => new FindUserByIdService(userRepository),
        inject: [
            UserDiTokens.UserRepositoryInterface
        ]
    }
];

@Module({
    exports: [
        UserDiTokens.FindUserByUsernameService, 
        UserDiTokens.SaveUserService,
        UserDiTokens.FindUserByIdService
    ],
    controllers: [
        UserController
    ],
    providers: [
        ...repositoryProviders, 
        ...serviceProviders
    ]
})

export class UsersModule {}
