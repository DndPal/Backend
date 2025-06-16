import { Module, Provider } from "@nestjs/common";
import { PartyController } from "./controllers/party.controller";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { PartyDiTokens } from "./di/party-tokens.di";
import { DataSource, Repository } from "typeorm";
import { Party } from "./entities/party.entity";
import { DatabaseDiTokens } from "src/infrastructure/database/di/database-tokens.di";
import { PartyRepository } from "./repositories/mysql/party.repository";
import { CharacterModule } from "src/character/character.module";
import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { PartyRepositoryInterface } from "./repositories/party-repository.interface";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { KickCharacterService } from "./services/kick-character.service";
import { CharacterDiTokens } from "src/character/di/character-tokens.di";
import { UsersModule } from "src/user/user.module";
import { Invitation } from "./entities/invitation.entity";
import { InvitationRepository } from "./repositories/mysql/invitation.repository";
import { InvitationRepositoryInterface } from "./repositories/invitation-repository.interface";
import { InviteUserToPartyService } from "./services/invite-user-to-party.service";
import { AssignPartyToCharacterUseCase } from "src/character/services/usecases/assign-party-to-character.usecase";
import { JoinPartyService } from "./services/join-party.service";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { LeavePartyService } from "./services/leave-party.sevice";
import { UserDiTokens } from "src/user/di/user-tokens.di";
import { SavePartyService } from "./services/save-party.service";
import { DeletePartyService } from "./services/delete-party.service";
import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";
import { FindUserByIdService } from "src/user/services/find-user-by-id.service";
import { FindItemPresetByIdUseCase } from "src/items/services/usecases/find-item-preset-by-id.usecase";
import { SaveItemUseCase } from "src/items/services/usecases/save-item.service";
import { GiveItemToCharacterService } from "./services/give-item-to-character.service";
import { ItemDiTokens } from "src/items/di/item-tokens.di";
import { ItemsModule } from "src/items/items.module";

const repositoryProviders: Array<Provider> = [
    {
        provide: PartyDiTokens.MySQLPartyRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Party),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: PartyDiTokens.MySQLInvitationRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Invitation),
        inject: [DatabaseDiTokens.MySQLDataSource]
    },
    {
        provide: PartyDiTokens.PartyRepositoryInterface,
        useFactory: (repository: Repository<Party>) => new PartyRepository(repository),
        inject: [PartyDiTokens.MySQLPartyRepositoryInterface]
    },
    {
        provide: PartyDiTokens.InvitationRepositoryInterface,
        useFactory: (repository: Repository<Invitation>) => new InvitationRepository(repository),
        inject: [PartyDiTokens.MySQLInvitationRepositoryInterface]
    }
];

const serviceProviders: Array<Provider> = [
    {
        provide: PartyDiTokens.KickCharacterService,
        useFactory: (
            removePartyFromCharacterService: RemovePartyFromCharacterUseCase, 
            findUserByIdService: FindUserByIdUseCase, 
            findCharacterByIdService: FindCharacterByIdUseCase
        ) => new KickCharacterService(removePartyFromCharacterService, findCharacterByIdService, findUserByIdService),
        inject: [CharacterDiTokens.RemovePartyFromCharacterService, UserDiTokens.FindUserByIdService, CharacterDiTokens.FindCharacterByIdService]
        
    },
    {
        provide: PartyDiTokens.InviteUserToPartyService,
        useFactory: (invitationRepository: InvitationRepositoryInterface, findUserByIdService: FindUserByIdUseCase) => new InviteUserToPartyService(invitationRepository, findUserByIdService),
        inject: [PartyDiTokens.InvitationRepositoryInterface, UserDiTokens.FindUserByIdService]
    },
    {
        provide: PartyDiTokens.JoinPartyService,
        useFactory: (
            invitationRepository: InvitationRepositoryInterface, 
            assignPartyToCharacterService: AssignPartyToCharacterUseCase, 
            partyRepository: PartyRepositoryInterface
        ) => new JoinPartyService(invitationRepository, assignPartyToCharacterService, partyRepository),
        inject: [PartyDiTokens.InvitationRepositoryInterface, CharacterDiTokens.AssignPartyToCharacterService, PartyDiTokens.PartyRepositoryInterface]
    },
    {
        provide: PartyDiTokens.LeavePartyService,
        useFactory: (
            removePartyFromCharacterService: RemovePartyFromCharacterUseCase, 
            findCharacterByIdService: FindCharacterByIdUseCase, 
            findUserByIdService: FindUserByIdUseCase
        ) => new LeavePartyService(removePartyFromCharacterService, findCharacterByIdService, findUserByIdService),
        inject: [CharacterDiTokens.RemovePartyFromCharacterService, CharacterDiTokens.FindCharacterByIdService, UserDiTokens.FindUserByIdService]
    },
    {
        provide: PartyDiTokens.SavePartyService,
        useFactory: (partyRepository: PartyRepositoryInterface, findUserByIdService: FindUserByIdUseCase) => new SavePartyService(partyRepository, findUserByIdService),
        inject: [PartyDiTokens.PartyRepositoryInterface, UserDiTokens.FindUserByIdService]
    },
    {
        provide: PartyDiTokens.DeletePartyService,
        useFactory: (partyRepository: PartyRepositoryInterface, findUserByIdService: FindUserByIdUseCase) => new DeletePartyService(partyRepository, findUserByIdService),
        inject: [PartyDiTokens.PartyRepositoryInterface, UserDiTokens.FindUserByIdService, UserDiTokens.SaveUserService]
    },
    {
        provide: PartyDiTokens.GiveItemToCharacterService,
        useFactory: (
            findUserByIdService: FindUserByIdUseCase,
            findCharacterByIdService: FindCharacterByIdUseCase,
            findItemPresetByIdService: FindItemPresetByIdUseCase,
            saveItemService: SaveItemUseCase
        ) => new GiveItemToCharacterService(findUserByIdService, findCharacterByIdService, findItemPresetByIdService, saveItemService),
        inject:[UserDiTokens.FindUserByIdService, CharacterDiTokens.FindCharacterByIdService, ItemDiTokens.FindItemPresetByIdService, ItemDiTokens.SaveItemService]
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
        CharacterModule,
        UsersModule,
        ItemsModule
    ]
})

export class PartyModule {}