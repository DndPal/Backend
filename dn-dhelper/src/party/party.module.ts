import { Module, Provider } from "@nestjs/common";
import { PartyController } from "./controllers/party.controller";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { PartyDiTokens } from "./di/party-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Party } from "./entities/party.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { PartyRepository } from "./repositories/mysql/party.repository";
import { SavePartyService } from "./services/save-party.service";
import { CharacterModule } from "src/character/character.module";
import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { FindUserBySessionIdUseCase } from "src/authentication/services/usecases/find-user-by-session-id.usecase";
import { PartyRepositoryInterface } from "./repositories/party-repository.interface";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { KickCharacterService } from "./services/kick-character.service";
import { CharacterDiTokens } from "src/character/di/character-tokens.di";
import { AuthenticationDiTokens } from "src/authentication/di/authentication-tokens.di";

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
    },
    {
        provide: PartyDiTokens.KickCharacterService,
        useFactory: (removePartyFromCharacterService: RemovePartyFromCharacterUseCase, findUserBySessionIdService: FindUserBySessionIdUseCase, partyRepository: PartyRepositoryInterface, findCharacterByIdService: FindCharacterByIdUseCase) => new KickCharacterService(removePartyFromCharacterService, findUserBySessionIdService, partyRepository, findCharacterByIdService),
        inject: [CharacterDiTokens.RemovePartyFromCharacterService, AuthenticationDiTokens.FindUserBySessionIdService, PartyDiTokens.PartyRepositoryInterface, CharacterDiTokens.FindCharacterByIdService]
        
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
        AuthenticationModule,
        CharacterModule
    ]
})

export class PartyModule {}