import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Request } from "@nestjs/common";
import { PartyDiTokens } from "../di/party-tokens.di";
import { RemoveCharacterFromPartyPort, RemoveCharacterFromPartyUseCase } from "../services/usecases/remove-character-from-party.usecase";
import { InviteUserToPartyPort, InviteUserToPartyUseCase } from "../services/usecases/invite-character-to-party.usecase";
import { JoinPartyPort, JoinPartyUseCase } from "../services/usecases/join-party.usecase";
import { LeavePartyPort, LeavePartyUseCase } from "../services/usecases/leave-party.usecase";
import { CreatePartyPort, CreatePartyUseCase } from "../services/usecases/create-party.usecase";
import { DeletePartyPort, DeletePartyUseCase } from "../services/usecases/delete-party.usecase";
import { ProvideItemToCharacterPort, ProvideItemToCharacterUseCase } from "../services/usecases/provide-item-to-character.usecase";
import { AddNonPlayableCharacterToPartyPort, AddNonPlayableCharacterToPartyUseCase } from "../services/usecases/add-non-playable-character-to-party.usecase";
import { AttackCharacterPort, AttackCharacterUseCase } from "../services/usecases/attack-character.usecase";
import { Party } from "../entities/party.entity";
import { Invitation } from "../entities/invitation.entity";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { InviteUserToPartyResponseDto } from "../dto/invite-user-to-party-reponse.dto";
import { AddNonPlayableCharacterToPartyResponseDto } from "../dto/add-non-playable-character-to-party-response.dto";
import { LeavePartyResponseDto } from "../dto/leave-party-response.dto";
import { PlayableCharacter } from "src/character/entities/playable-character.entity";
import { RemoveCharacterFromPartyResponseDto } from "../dto/remove-character-from-party-response.dto";
import { ProvideItemToCharacterResponseDto } from "../dto/provide-item-to-character-response.dto";
import { AttackCharacterResponseDto } from "../dto/attack-character-response.dto";
import { JoinPartyResponseDto } from "../dto/join-party-response.dto";
import { GetPartyByPartyIdPort, GetPartyByPartyIdUseCase } from "../services/usecases/get-party-by-party-id.usecase";
import { GetPartyByPartyIdResponseDto } from "../dto/get-party-by-party-id-response.dto";
import { InvokeAbilityCheckPort, InvokeAbilityCheckUseCase } from "../services/usecases/invoke-ability-check.usecase";
import { AbilityCheckResponseDto } from "src/dice/dto/ability-check-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePartyResponseDto } from "../dto/create-party-response.dto";

@ApiTags('Parties')
@Controller('parties')
export class PartyController {
    constructor(
        @Inject(PartyDiTokens.RemoveCharacterFromPartyService)
        private readonly removeCharacterFromPartyService: RemoveCharacterFromPartyUseCase,
        @Inject(PartyDiTokens.InviteUserToPartyService)
        private readonly inviteUserToPartyService: InviteUserToPartyUseCase,
        @Inject(PartyDiTokens.JoinPartyService)
        private readonly joinPartyService: JoinPartyUseCase,
        @Inject(PartyDiTokens.LeavePartyService)
        private readonly leavePartyService: LeavePartyUseCase,
        @Inject(PartyDiTokens.CreatePartyService)
        private readonly savePartyService: CreatePartyUseCase,
        @Inject(PartyDiTokens.DeletePartyService)
        private readonly deletePartyService: DeletePartyUseCase,
        @Inject(PartyDiTokens.ProvideItemToCharacterService)
        private readonly provideItemToCharacterService: ProvideItemToCharacterUseCase,
        @Inject(PartyDiTokens.AddNonPlayableCharacterToPartyService)
        private readonly addNonPlayableCharacterToPartyService: AddNonPlayableCharacterToPartyUseCase,
        @Inject(PartyDiTokens.AttackCharacterService)
        private readonly attackCharacterService: AttackCharacterUseCase,
        @Inject(PartyDiTokens.GetPartyByPartyIdService)
        private readonly getPartyByPartyIdService: GetPartyByPartyIdUseCase,
        @Inject(PartyDiTokens.InvokeAbilityCheckService)
        private readonly invokeAbilityCheckService: InvokeAbilityCheckUseCase
    ) {}

    @Patch(':partyId/characters/:characterId')
    @ApiOperation({ summary: 'Remove character from party' })
    @ApiResponse({ status: 200, description: 'Character removed from party succesfully', type: RemoveCharacterFromPartyResponseDto })
    async removeCharacter(
        @Param('partyId') partyId: number,
        @Param('characterId') characterId: number,
        @Request() req
    ): Promise<RemoveCharacterFromPartyResponseDto> {
        const payload: RemoveCharacterFromPartyPort = {
            characterId: characterId,
            partyId: partyId,
            userId: req.user.id
        }

        const party: Party = await this.removeCharacterFromPartyService.execute(payload);

        return {
            partyId: party.id,
            members: party.members,
            partyLeaderId: party.leader.id,
            characterSlots: party.characterSlots
        }
    }

    @Post('')
    @ApiOperation({ summary: 'Create a party' })
    @ApiResponse({ status: 200, description: 'Party created succesfully', type: CreatePartyResponseDto })
    async createParty(
        @Body() payload: CreatePartyPort,
        @Request() req
    ): Promise<CreatePartyResponseDto> {
        payload.userId = req.user.id;

        const party: Party = await this.savePartyService.execute(payload);

        return {
            partyId: party.id,
            partyLeaderId: party.leader.id,
            characterSlots: party.characterSlots
        }
    }

    @Post(':id/invitations')
    @ApiOperation({ summary: 'Invite user to party' })
    @ApiResponse({ status: 200, description: 'Invitation sent succesfully', type: InviteUserToPartyResponseDto })
    async inviteUserToParty(
        @Param('id') id: number,
        @Body() payload: InviteUserToPartyPort,
        @Request() req
    ): Promise<InviteUserToPartyResponseDto> {
        payload.partyId = id;
        payload.userId = req.user.id;

        const invitation: Invitation = await this.inviteUserToPartyService.execute(payload);

        return {
            invitationId: invitation.id,
            partyInvitedToId: invitation.partyInvitedTo.id,
            invitedUserId: invitation.invitedUser.id
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete party' })
    @ApiResponse({ status: 200, description: 'Party deleted succesfully' })
    async deletParty(
        @Param('id') id: number,
        @Request() req
    ) {
        const payload: DeletePartyPort = {
            partyId: id,
            userId: req.user.id
        };

        await this.deletePartyService.execute(payload);

        return { message: 'party deleted succesfully' };
    }

    @Patch(':partyId/join')
    @ApiOperation({ summary: 'Join a party' })
    @ApiResponse({ status: 200, description: 'Party joined succesfully', type: JoinPartyResponseDto })
    async joinParty(
        @Request() req,
        @Body() payload: JoinPartyPort,
        @Param('partyId') partyId: number,
    ): Promise<JoinPartyResponseDto> {
        payload.userId = req.user.id;
        payload.partyId = partyId;

        const party: Party = await this.joinPartyService.execute(payload);

        return {
            partyId: party.id,
            partyLeaderId: party.leader.id,
            members: party.members.map(member => ({
                characterId: member.id,
                characterName: member.name,
                character_type: member.character_type,
                inventory: member.inventory,
                equippedArmor: member.equippedArmor,
                equippedWeapon: member.equippedWeapon,
                characterAttributes: member.characterAttributes
            })),
            characterSlots: party.characterSlots
        }
    }

    @Patch(':partyId/characters/:characterId/leave')
    @ApiOperation({ summary: 'Leave a party' })
    @ApiResponse({ status: 200, description: 'Party left succesfully', type: LeavePartyResponseDto })
    async leaveParty(
        @Request() req,
        @Param('partyId') partyId: number,
        @Param('characterId') characterId: number
    ): Promise<LeavePartyResponseDto> {
        const payload: LeavePartyPort = {
            userId: req.user.id,
            partyId: partyId,
            characterId: characterId
        }

        const character: PlayableCharacter = await this.leavePartyService.execute(payload);

        return {
            characterId: character.id,
            characterParty: character.party
        }
    }

    @Post(':partyId/characters/:characterId/items')
    @ApiOperation({ summary: 'Provide item to character from your party' })
    @ApiResponse({ status: 200, description: 'Item provided succesfully', type: ProvideItemToCharacterResponseDto })
    async provideItemToCharacter(
        @Param('partyId') partyId: number,
        @Param('characterId') characterId: number,
        @Request() req,
        @Body() payload: ProvideItemToCharacterPort
    ): Promise<ProvideItemToCharacterResponseDto> {
        payload.userId = req.user.id;
        payload.partyId = partyId;
        payload.characterId = characterId;

        const item: Item = await this.provideItemToCharacterService.execute(payload);

        return {
            itemId: item.id,
            itemName: item.itemName,
            modifierAttribute: item.modifierAttribute,
            dice: item.dice,
            ownerId: item.owner.id,
        }
    }

    @Post(':partyId/characters')
    @ApiOperation({ summary: 'Add a NPC to party' })
    @ApiResponse({ status: 200, description: 'NPC added succesfully', type: AddNonPlayableCharacterToPartyResponseDto })
    async addNonPlayableCharacter(
        @Param('partyId') partyId: number,
        @Request() req,
        @Body() payload: AddNonPlayableCharacterToPartyPort
    ): Promise<AddNonPlayableCharacterToPartyResponseDto> {
        payload.partyId = partyId;
        payload.userId = req.user.id;
        
        return await this.addNonPlayableCharacterToPartyService.execute(payload);
    }

    @Patch(':partyId/combat')
    @ApiOperation({ summary: 'Attack a character from party with your character' })
    @ApiResponse({ status: 200, description: 'Character attacked succesfully', type: AttackCharacterResponseDto })
    async attackCharacter(
        @Request() req,
        @Param('partyId') partyId: number,
        @Body() payload: AttackCharacterPort
    ): Promise<AttackCharacterResponseDto> {
        payload.userId = req.user.id;
        payload.partyId = partyId;

        return await this.attackCharacterService.execute(payload);    
    }

    @Get(':partyId')
    @ApiOperation({ summary: 'Get party by id' })
    @ApiResponse({ status: 200, description: 'Party returned succesfully', type: GetPartyByPartyIdResponseDto })
    async getPartyById(
        @Request() req,
        @Param('partyId') partyId: number,
    ): Promise<GetPartyByPartyIdResponseDto> {
        const payload: GetPartyByPartyIdPort = {
            userId: req.user.id,
            partyId: partyId
        }
        
        const party: Party = await this.getPartyByPartyIdService.execute(payload);
        
        return {
            partyId: party.id,
            partyLeader: {
                id: party.leader.id,
                username: party.leader.username
            },
            members: party.members.map(member => ({
                characterId: member.id,
                characterName: member.name,
                character_type: member.character_type,
                inventory: member.inventory,
                equippedArmor: member.equippedArmor,
                equippedWeapon: member.equippedWeapon,
                characterAttributes: member.characterAttributes,
                user: {
                    id: member.user?.id,
                    username: member.user?.username
                }
            })),
            characterSlots: party.characterSlots
        }
    }

    @Get(':partyId/characters/:characterId/ability_check')
    @ApiOperation({ summary: 'Request an ability check from any of the characters from your party' })
    @ApiResponse({ status: 200, description: 'Ability check inititated succesfully', type: AbilityCheckResponseDto })
    async invokeAbilityCheck(
        @Body() payload: InvokeAbilityCheckPort,
        @Request() req,
        @Param('partyId') partyId: number,
        @Param('characterId') characterId: number
    ): Promise<AbilityCheckResponseDto> {
        payload.userId = req.user.id;
        payload.partyId = partyId;
        payload.characterId = characterId;

        return await this.invokeAbilityCheckService.execute(payload);
    }
}
