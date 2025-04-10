import { Module, Provider } from "@nestjs/common";
import { PartyController } from "./controllers/party.controller";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { PartyDiTokens } from "./di/party-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Party } from "./entities/party.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { PartyRepository } from "./repositories/mysql/party.repository";
import { SavePartyService } from "./services/save-party.service";

const repositoryProviders: Array<Provider> = [
    {
        provide: PartyDiTokens.MySQLPartyRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Party),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: PartyDiTokens.PartyRepositoryInterface,
        useFactory: (repository: Repository<Party>) => new PartyRepository(repository),
        inject: [PartyDiTokens.MySQLPartyRepositoryInterface]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: PartyDiTokens.SavePartyService,
        useFactory: (partyRepository: PartyRepository) => new SavePartyService(partyRepository),
        inject: [PartyDiTokens.PartyRepositoryInterface]
    }
];

@Module({
    providers: [
        ...repositoryProviders,
        ...serviceProviders
    ],
    controllers: [
        PartyController
    ],
    imports: [
        AuthenticationModule
    ]
})

export class PartyModule {}