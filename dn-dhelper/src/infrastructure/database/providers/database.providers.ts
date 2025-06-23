import { Provider } from "@nestjs/common";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { DataSource } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Session } from "src/authentication/entities/session.entity";
import { Character } from "src/character/entities/abstracts/character.entity";
import { Party } from "src/party/entities/party.entity";
import { Invitation } from "src/party/entities/invitation.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";
import { Armor } from "src/items/entities/armor.entity";
import { Weapon } from "src/items/entities/weapon.entity";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { ArmorPreset } from "src/items/entities/armor-preset.entity";
import { WeaponPreset } from "src/items/entities/weapon-preset.entity";

export const databaseProviders: Array<Provider>  = [
    {
        provide: DatabaseDiTokens.MySQLDataSource,
        useFactory: () => {
            const dataSource: DataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB_NAME,
                entities: [
                    User,
                    Session,
                    Character,
                    Party,
                    Invitation,
                    Item,
                    ItemPreset,
                    Weapon, 
                    Armor,
                    CharacterAttributes,
                    ArmorPreset,
                    WeaponPreset
                ],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            });

            return dataSource.initialize();
        }
    }
]