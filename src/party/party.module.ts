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
import { RemoveCharacterFromPartyService } from "./services/remove-character-from-party.service";
import { CharacterDiTokens } from "src/character/di/character-tokens.di";
import { UsersModule } from "src/users/user.module";
import { Invitation } from "./entities/invitation.entity";
import { InvitationRepository } from "./repositories/mysql/invitation.repository";
import { InvitationRepositoryInterface } from "./repositories/invitation-repository.interface";
import { InviteUserToPartyService } from "./services/invite-user-to-party.service";
import { AssignPartyToCharacterUseCase } from "src/character/services/usecases/assign-party-to-character.usecase";
import { JoinPartyService } from "./services/join-party.service";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { LeavePartyService } from "./services/leave-party.sevice";
import { UserDiTokens } from "src/users/di/user-tokens.di";
import { CreatePartyService } from "./services/create-party.service";
import { DeletePartyService } from "./services/delete-party.service";
import { FindItemPresetByIdUseCase } from "src/items/services/usecases/find-item-preset-by-id.usecase";
import { SaveItemFromItemPresetUseCase } from "src/items/services/usecases/save-item-from-item-preset.usecase";
import { ProvideItemToCharacterService } from "./services/provide-item-to-character.service";
import { ItemDiTokens } from "src/items/di/item-tokens.di";
import { ItemsModule } from "src/items/items.module";
import { FindPlayableCharacterByIdUseCase } from "src/character/services/usecases/find-playable-character-by-id.usecase";
import { CreateNonPlayableCharacterUseCase } from "src/character/services/usecases/create-non-playable-character.usecase";
import { AddNonPlayableCharacterToPartyService } from "./services/add-non-playable-character-to-party.service";
import { DeleteCharacterUseCase } from "src/character/services/usecases/delete-character.usecase";
import { DiceModule } from "src/dice/dice.module";
import { AlterCharacterAttributesUseCase } from "src/character/services/usecases/alter-character-attributes.usecase";
import { DiceRollUseCase } from "src/dice/services/usecases/dice-roll.usecase";
import { AttackCharacterService } from "./services/attack-character.service";
import { DiceDiTokens } from "src/dice/di/dice-tokens.di";
import { GetPartyByPartyIdService } from "./services/get-party-by-party-id.service";
import { InvokeAbilityCheckService } from "./services/invoke-ability-check.service";
import { AbilityCheckUseCase } from "src/dice/services/usecases/ability-check.usecase";

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
        provide: PartyDiTokens.RemoveCharacterFromPartyService,
        useFactory: (
            partyRepository: PartyRepositoryInterface,
            removePartyFromCharacterService: RemovePartyFromCharacterUseCase
        ) => new RemoveCharacterFromPartyService(partyRepository,removePartyFromCharacterService),
        inject: [
            PartyDiTokens.PartyRepositoryInterface,
            CharacterDiTokens.RemovePartyFromCharacterService
        ]
    },
    {
        provide: PartyDiTokens.InviteUserToPartyService,
        useFactory: (
            invitationRepository: InvitationRepositoryInterface, 
            findUserByIdService: FindUserByIdUseCase,
            partyRepository: PartyRepositoryInterface
        ) => new InviteUserToPartyService(invitationRepository, findUserByIdService, partyRepository),
        inject: [
            PartyDiTokens.InvitationRepositoryInterface, 
            UserDiTokens.FindUserByIdService,
            PartyDiTokens.PartyRepositoryInterface
        ]
    },
    {
        provide: PartyDiTokens.JoinPartyService,
        useFactory: (
            invitationRepository: InvitationRepositoryInterface, 
            assignPartyToCharacterService: AssignPartyToCharacterUseCase, 
            partyRepository: PartyRepositoryInterface,
            findUserByIdServce: FindUserByIdUseCase 
        ) => new JoinPartyService(invitationRepository, assignPartyToCharacterService, partyRepository, findUserByIdServce),
        inject: [
            PartyDiTokens.InvitationRepositoryInterface, 
            CharacterDiTokens.AssignPartyToCharacterService,
            PartyDiTokens.PartyRepositoryInterface,
            UserDiTokens.FindUserByIdService
        ]
    },
    {
        provide: PartyDiTokens.LeavePartyService,
        useFactory: (
            removePartyFromCharacterService: RemovePartyFromCharacterUseCase, 
            findPlayableCharacterByIdService: FindPlayableCharacterByIdUseCase, 
        ) => new LeavePartyService(removePartyFromCharacterService, findPlayableCharacterByIdService),
        inject: [
            CharacterDiTokens.RemovePartyFromCharacterService, 
            CharacterDiTokens.FindPlayableCharacterByIdService, 
        ]
    },
    {
        provide: PartyDiTokens.CreatePartyService,
        useFactory: (
            partyRepository: PartyRepositoryInterface, 
            findUserByIdService: FindUserByIdUseCase
        ) => new CreatePartyService(partyRepository, findUserByIdService),
        inject: [
            PartyDiTokens.PartyRepositoryInterface, 
            UserDiTokens.FindUserByIdService
        ]
    },
    {
        provide: PartyDiTokens.DeletePartyService,
        useFactory: (
            partyRepository: PartyRepositoryInterface, 
            deleteCharacterService: DeleteCharacterUseCase
        ) => new DeletePartyService(partyRepository, deleteCharacterService),
        inject: [
            PartyDiTokens.PartyRepositoryInterface,
            CharacterDiTokens.DeleteCharacterService        
        ]
    },
    {
        provide: PartyDiTokens.ProvideItemToCharacterService,
        useFactory: (
            findItemPresetByIdService: FindItemPresetByIdUseCase,
            saveItemFromItemPresetService: SaveItemFromItemPresetUseCase,
            partyRepository: PartyRepositoryInterface,
        ) => new ProvideItemToCharacterService(findItemPresetByIdService, saveItemFromItemPresetService, partyRepository),
        inject: [
            ItemDiTokens.FindItemPresetByIdService, 
            ItemDiTokens.SaveItemFromItemPresetService,
            PartyDiTokens.PartyRepositoryInterface
        ]
    },
    {
        provide: PartyDiTokens.AddNonPlayableCharacterToPartyService,
        useFactory: (
            createNonPlayableCharacterService: CreateNonPlayableCharacterUseCase,
            partyRepository: PartyRepositoryInterface,
        ) => new AddNonPlayableCharacterToPartyService(createNonPlayableCharacterService, partyRepository),
        inject: [
            CharacterDiTokens.CreateNonPlayableCharacterService,
            PartyDiTokens.PartyRepositoryInterface
        ]
    },
    {
        provide: PartyDiTokens.AttackCharacterService,
        useFactory: (
            alterCharacterAttributesService: AlterCharacterAttributesUseCase,
            diceRollService: DiceRollUseCase,
            findUserByIdServce: FindUserByIdUseCase,
            deleteCharacterService: DeleteCharacterUseCase,
            partyRepository: PartyRepositoryInterface
        ) => new AttackCharacterService(alterCharacterAttributesService, diceRollService, findUserByIdServce, deleteCharacterService, partyRepository),
        inject: [
            CharacterDiTokens.AlterCharacterAttributesService,
            DiceDiTokens.DiceRollService,
            UserDiTokens.FindUserByIdService,
            CharacterDiTokens.DeleteCharacterService,
            PartyDiTokens.PartyRepositoryInterface
        ]
    },
    {
        provide: PartyDiTokens.GetPartyByPartyIdService,
        useFactory: (
            partyRepository: PartyRepositoryInterface
        ) => new GetPartyByPartyIdService(partyRepository),
        inject: [
            PartyDiTokens.PartyRepositoryInterface
        ]
    },
    {
        provide: PartyDiTokens.InvokeAbilityCheckService,
        useFactory: (
            partyRepository: PartyRepositoryInterface,
            abilityCheckservice: AbilityCheckUseCase
        ) => new InvokeAbilityCheckService(partyRepository, abilityCheckservice),
        inject: [
            PartyDiTokens.PartyRepositoryInterface,
            DiceDiTokens.AbilityCheckService
        ]
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
        ItemsModule,
        DiceModule
    ]
})

export class PartyModule {}