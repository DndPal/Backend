import { Module, Provider } from "@nestjs/common";
import { ItemDiTokens } from "./di/item-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Item } from "./entities/abstracts/item.abstract";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { ItemRepository } from "./repositories/mysql/item.repository";
import { ItemRepositoryInterface } from "./repositories/item-repository.interface";
import { FindItemByIdAndCharacterIdService } from "./services/find-item-by-id-and-character-id.service";
import { ItemPreset } from "./entities/abstracts/item-preset.abstract";
import { ItemPresetRepository } from "./repositories/mysql/item-preset.repository";
import { FindItemPresetByIdService } from "./services/find-item-preset-by-id.service";
import { ItemPresetRepositoryInterface } from "./repositories/item-preset-repository.interface";
import { SaveArmorPresetService } from "./services/save-armor-preset.service";
import { SaveWeaponPresetService } from "./services/save-weapon-preset.service";
import { SaveItemFromItemPresetService } from "./services/save-item-from-item-preset.service";
import { itemPresetsController } from "./controllers/item-presets.controller";
import { FindItemPresetsByCreatorIdService } from "./services/find-item-presets-by-creator-id.service";
import { SaveItemService } from "./services/save-item.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: ItemDiTokens.MySQLItemRepositoryInterface,
        useFactory: (
            dataSource: DataSource
        ) => dataSource.getRepository(Item),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    },
    {
        provide: ItemDiTokens.ItemRepositoryInterface,
        useFactory: (
            repository: Repository<Item>
        ) => new ItemRepository(repository),
        inject: [
            ItemDiTokens.MySQLItemRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.MySQLItemPresetRepositoryInterface,
        useFactory: (
            dataSource: DataSource
        ) => dataSource.getRepository(ItemPreset),
        inject: [
            DatabaseDiTokens.MySQLDataSource
        ]
    },
    {
        provide: ItemDiTokens.ItemPresetRepositoryInterface,
        useFactory: (
            repository: Repository<ItemPreset>
        ) => new ItemPresetRepository(repository),
        inject: [
            ItemDiTokens.MySQLItemPresetRepositoryInterface
        ]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: ItemDiTokens.FindItemByIdAndCharacterIdService,
        useFactory: (
            repository: ItemRepositoryInterface
        ) => new FindItemByIdAndCharacterIdService(repository),
        inject: [
            ItemDiTokens.ItemRepositoryInterface]

    },
    {
        provide: ItemDiTokens.FindItemPresetByIdService,
        useFactory: (
            repository: ItemPresetRepositoryInterface
        ) => new FindItemPresetByIdService(repository),
        inject: [
            ItemDiTokens.ItemPresetRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.SaveArmorPresetService,
        useFactory: (
            repository: ItemPresetRepositoryInterface
        ) => new SaveArmorPresetService(repository),
        inject: [
            ItemDiTokens.ItemPresetRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.SaveWeaponPresetService,
        useFactory: (
            repository: ItemPresetRepositoryInterface
        ) => new SaveWeaponPresetService(repository),
        inject: [
            ItemDiTokens.ItemPresetRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.SaveItemFromItemPresetService,
        useFactory: (
            repository: ItemRepositoryInterface
        ) => new SaveItemFromItemPresetService(repository),
        inject: [
            ItemDiTokens.ItemRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.FindItemPresetsByCreatorIdService,
        useFactory: (
            repository: ItemPresetRepositoryInterface
        ) => new FindItemPresetsByCreatorIdService(repository),
        inject: [
            ItemDiTokens.ItemPresetRepositoryInterface
        ]
    },
    {
        provide: ItemDiTokens.SaveItemService,
        useFactory: (
            repository: ItemRepositoryInterface
        ) => new SaveItemService(repository),
        inject: [
            ItemDiTokens.ItemRepositoryInterface
        ]
    }
];

@Module({
    providers: [
        ...serviceProviders,
        ...repositoryProviders
    ],
    controllers: [
        itemPresetsController
    ],
    exports: [
        ItemDiTokens.FindItemByIdAndCharacterIdService,
        ItemDiTokens.FindItemPresetByIdService,
        ItemDiTokens.SaveItemFromItemPresetService,
        ItemDiTokens.SaveItemService
    ]
})

export class ItemsModule {};
