import { Module, Provider } from "@nestjs/common";
import { CharacterController } from "./controllers/character.controller";
import { CharacterDiTokens } from "./di/character-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Character } from "./entities/abstracts/character.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { CharacterRepository } from "./repositories/mysql/character.repository";
import { CharacterRepositoryInterface } from "./repositories/character-repository.interface";
import { SaveCharacterService } from "./services/save-character.service";
import { AuthenticationDiTokens } from "src/authentication/di/authentication-tokens.di";
import { AlterCharacterStatsService } from "./services/alter-character-stats.service";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { FindCharacterByIdService } from "./services/find-character-by-id.service";
import { RemovePartyFromCharacterService } from "./services/remove-party-from-character.service";
import { AssignPartyToCharacterService } from "./services/assign-party-to-character.service";
import { UsersModule } from "src/user/user.module";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { UserDiTokens } from "src/user/di/user-tokens.di";
import { CharacterAttributes } from "./entities/character-attributes.entity";
import { CharacterAttributesRepository } from "./repositories/mysql/character-attributes.repository";
import { CharacterAttributesRepositoryInterface } from "./repositories/character-attributes-repository.interface";
import { ItemsModule } from "src/items/items.module";
import { FindItemByIdAndCharacterIdUseCase } from "src/items/services/usecases/find-item-by-id-and-character-id.usecase";
import { EquipItemService } from "./services/equip-item.usecase";
import { ItemDiTokens } from "src/items/di/item-tokens.di";

const repositoryProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.MySQLCharacterRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Character),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: CharacterDiTokens.CharacterRepositoryInterface,
        useFactory: (repository: Repository<Character>) => new CharacterRepository(repository),
        inject: [CharacterDiTokens.MySQLCharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.MySQLCharacterAttributesRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CharacterAttributes),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: CharacterDiTokens.CharacterAttributesRepositoryInterface,
        useFactory: (repository: Repository<CharacterAttributes>) => new CharacterAttributesRepository(repository),
        inject: [CharacterDiTokens.MySQLCharacterAttributesRepositoryInterface]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.RemovePartyFromCharacterService,
        useFactory: (characterRepository: CharacterRepositoryInterface) => new RemovePartyFromCharacterService(characterRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.FindCharacterByIdService,
        useFactory: (characterRepository: CharacterRepositoryInterface) => new FindCharacterByIdService(characterRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.SaveCharacterService,
        useFactory: (characterRepository: CharacterRepositoryInterface, findUserByIdService: FindUserByIdUseCase, characterAttributesRepository: CharacterAttributesRepositoryInterface) => new SaveCharacterService(characterRepository, characterAttributesRepository, findUserByIdService),
        inject: [CharacterDiTokens.CharacterRepositoryInterface, UserDiTokens.FindUserByIdService, CharacterDiTokens.CharacterAttributesRepositoryInterface]

    },
    {
        provide: CharacterDiTokens.AlterCharacterStatsService,
        useFactory: (characterAttributesRepository: CharacterAttributesRepositoryInterface) => new AlterCharacterStatsService(characterAttributesRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.AssignPartyToCharacterService,
        useFactory: (characterRepository: CharacterRepositoryInterface) => new AssignPartyToCharacterService(characterRepository),
        inject: [CharacterDiTokens.CharacterRepositoryInterface]
    },
    {
        provide: CharacterDiTokens.EquipItemService,
        useFactory: (characterRepository: CharacterRepositoryInterface, findItemByIdAndCharacterId: FindItemByIdAndCharacterIdUseCase ) => new EquipItemService(characterRepository, findItemByIdAndCharacterId),
        inject: [CharacterDiTokens.CharacterRepositoryInterface, ItemDiTokens.FindItemByIdAndCharacterIdService]
    }
];

@Module({
    imports: [
        UsersModule,
        ItemsModule
    ],
    controllers: [
        CharacterController
    ],
    providers: [
        ...repositoryProviders,
        ...serviceProviders
    ],
    exports: [
        CharacterDiTokens.RemovePartyFromCharacterService,
        CharacterDiTokens.FindCharacterByIdService,
        CharacterDiTokens.AssignPartyToCharacterService
    ]
})

export class CharacterModule {}