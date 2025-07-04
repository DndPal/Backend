import { Module, Provider } from "@nestjs/common";
import { CharacterController } from "./controllers/character.controller";
import { CharacterDiTokens } from "./di/character-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Character } from "./entities/abstracts/character.abstract";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { CharacterRepository } from "./repositories/mysql/character.repository";
import { CharacterRepositoryInterface } from "./repositories/character-repository.interface";
import { CreatePlayableCharacterService } from "./services/create-playable-character.service";
import { AlterCharacterAttributesService } from "./services/alter-character-attributes.service";
import { FindCharacterByIdService } from "./services/find-character-by-id.service";
import { RemovePartyFromCharacterService } from "./services/remove-party-from-character.service";
import { AssignPartyToCharacterService } from "./services/assign-party-to-character.service";
import { UsersModule } from "src/users/user.module";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { UserDiTokens } from "src/users/di/user-tokens.di";
import { CharacterAttributes } from "./entities/character-attributes.entity";
import { CharacterAttributesRepository } from "./repositories/mysql/character-attributes.repository";
import { CharacterAttributesRepositoryInterface } from "./repositories/character-attributes-repository.interface";
import { ItemsModule } from "src/items/items.module";
import { EquipItemService } from "./services/equip-item.service";
import { CreateNonPlayableCharacterService } from "./services/create-non-playable-character.service";
import { FindPlayableCharacterByIdService } from "./services/find-playable-character-by-id.service";
import { DeleteCharacterService } from "./services/delete-character.service";
import { NonPlayableCharacterSubscriber } from "./entities/subscribers/non-playable-character.subscriber";
import { DeletePlayableCharacterService } from "./services/delete-playable-character.service";
import { FindPlayableCharactersByUserIdService } from "./services/find-playable-characters-by-user-id.service";
import { SaveItemUseCase } from "src/items/services/usecases/save-item.usecase";
import { ItemDiTokens } from "src/items/di/item-tokens.di";
import { FindItemByIdAndCharacterIdUseCase } from "src/items/services/usecases/find-item-by-id-and-character-id.usecase";

const repositoryProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.MySQLCharacterRepositoryInterface,
        useFactory: (
            dataSource: DataSource
        ) => dataSource.getRepository(Character),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    },
    {
        provide: CharacterDiTokens.CharacterRepositoryInterface,
        useFactory: (
            repository: Repository<Character>
        ) => new CharacterRepository(repository),
        inject: [
            CharacterDiTokens.MySQLCharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.MySQLCharacterAttributesRepositoryInterface,
        useFactory: (
            dataSource: DataSource
        ) => dataSource.getRepository(CharacterAttributes),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    },
    {
        provide: CharacterDiTokens.CharacterAttributesRepositoryInterface,
        useFactory: (
            repository: Repository<CharacterAttributes>
        ) => new CharacterAttributesRepository(repository),
        inject: [
            CharacterDiTokens.MySQLCharacterAttributesRepositoryInterface
        ]
    }
];

const subscriberProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.NonPlayableCharacterSubscriber,
        useFactory: (
            dataSource: DataSource
        ) => new NonPlayableCharacterSubscriber(dataSource),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    },
    {
        provide: CharacterDiTokens.CharacterAttributesSubscriber,
        useFactory: (
            dataSource: DataSource
        ) => new NonPlayableCharacterSubscriber(dataSource),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: CharacterDiTokens.RemovePartyFromCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new RemovePartyFromCharacterService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.FindCharacterByIdService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new FindCharacterByIdService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.CreatePlayableCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface, 
            findUserByIdService: FindUserByIdUseCase, 
            characterAttributesRepository: CharacterAttributesRepositoryInterface
        ) => new CreatePlayableCharacterService(characterRepository, characterAttributesRepository, findUserByIdService),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface, 
            UserDiTokens.FindUserByIdService, 
            CharacterDiTokens.CharacterAttributesRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.CreateNonPlayableCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface, 
            characterAttributesRepository: CharacterAttributesRepositoryInterface
        ) => new CreateNonPlayableCharacterService(characterRepository, characterAttributesRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface, 
            CharacterDiTokens.CharacterAttributesRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.AlterCharacterAttributesService,
        useFactory: (
            characterAttributesRepository: CharacterAttributesRepositoryInterface
        ) => new AlterCharacterAttributesService(characterAttributesRepository),
        inject: [
            CharacterDiTokens.CharacterAttributesRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.AssignPartyToCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface, 
            findUserByIdServce: FindUserByIdUseCase
        ) => new AssignPartyToCharacterService(characterRepository, findUserByIdServce),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface, 
            UserDiTokens.FindUserByIdService
        ]
    },
    {
        provide: CharacterDiTokens.EquipItemService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface, 
            findUserByIdservice: FindUserByIdUseCase,
            saveItemService: SaveItemUseCase,
            findItemByIdAndCharacterIdService: FindItemByIdAndCharacterIdUseCase 
        ) => new EquipItemService(characterRepository, findUserByIdservice, saveItemService, findItemByIdAndCharacterIdService),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface, 
            UserDiTokens.FindUserByIdService,
            ItemDiTokens.SaveItemService,
            ItemDiTokens.FindItemByIdAndCharacterIdService
        ]
    },
    {
        provide: CharacterDiTokens.FindPlayableCharacterByIdService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new FindPlayableCharacterByIdService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.DeleteCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new DeleteCharacterService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.DeletePlayableCharacterService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new DeletePlayableCharacterService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
    },
    {
        provide: CharacterDiTokens.FindPlayableCharactersByUserIdService,
        useFactory: (
            characterRepository: CharacterRepositoryInterface
        ) => new FindPlayableCharactersByUserIdService(characterRepository),
        inject: [
            CharacterDiTokens.CharacterRepositoryInterface
        ]
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
        ...subscriberProviders,
        ...repositoryProviders,
        ...serviceProviders
    ],
    exports: [
        CharacterDiTokens.RemovePartyFromCharacterService,
        CharacterDiTokens.FindCharacterByIdService,
        CharacterDiTokens.AssignPartyToCharacterService,
        CharacterDiTokens.FindPlayableCharacterByIdService,
        CharacterDiTokens.CreateNonPlayableCharacterService,
        CharacterDiTokens.DeleteCharacterService,
        CharacterDiTokens.AlterCharacterAttributesService
    ]
})

export class CharacterModule {}
