import { Module, Provider } from "@nestjs/common";
import { CharacterController } from "./controllers/character.controller";
import { CharacterDiTokens } from "./di/character-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Character } from "./entities/character.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { CharacterRepository } from "./repositories/mysql/character.repository";
import { CharacterRepositoryInterface } from "./repositories/character-repository.interface";
import { SaveCharacterService } from "./services/save-character.service";
import { FindUserBySessionIdUseCase } from "src/authentication/services/usecases/find-user-by-session-id.usecase";
import { AuthenticationDiTokens } from "src/authentication/di/authentication-tokens.di";
import { RemoveCharacterService } from "./services/remove-character.service";
import { AlterCharacterStatsService } from "./services/alter-character-stats.service";
import { AuthenticationModule } from "src/authentication/authentication.module";

const repositoryProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.MySQLCharacterRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Character),
        inject:[DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: CharacterDiTokens.CharacterRepositoryInterface,
        useFactory: (repository: Repository<Character>) => new CharacterRepository(repository),
        inject: [CharacterDiTokens.MySQLCharacterRepositoryInterface]
    },
]

const serviceProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.SaveCharacterService,
        useFactory: (characterRepository: CharacterRepositoryInterface, findUserBySessionIdService: FindUserBySessionIdUseCase) => new SaveCharacterService(characterRepository, findUserBySessionIdService),
        inject: [CharacterDiTokens.CharacterRepositoryInterface, AuthenticationDiTokens.FindUserBySessionIdService]

    },
    {
        provide: CharacterDiTokens.RemoveCharacterService,
        useFactory: (characterRepository: CharacterRepository) => new RemoveCharacterService(characterRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.AlterCharacterStatsService,
        useFactory: (characterRepository) => new AlterCharacterStatsService(characterRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    }
]

@Module({
    imports: [
        AuthenticationModule
    ],
    controllers: [
        CharacterController
    ],
    providers: [
        ...repositoryProviders,
        ...serviceProviders
    ]
})

export class CharacterModule {}