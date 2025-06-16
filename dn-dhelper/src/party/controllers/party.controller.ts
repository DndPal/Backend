import { Body, Controller, Delete, Inject, Post, Put, Request } from "@nestjs/common";
import { PartyDiTokens } from "../di/party-tokens.di";
import { KickCharacterPort, KickCharacterUseCase } from "../services/usecases/kick-character.usecase";
import { InviteUserToPartyPort, InviteUserToPartyUseCase } from "../services/usecases/invite-character-to-party.usecase";
import { JoinPartyPort, JoinPartyUseCase } from "../services/usecases/join-party.usecase";
import { LeavePartyPort, LeavePartyUseCase } from "../services/usecases/leave-party.usecase";
import { SavePartyPort, SavePartyUseCase } from "../services/usecases/save-party.usecase";
import { DeletePartyUseCase } from "../services/usecases/delete-party.usecase";
import { GiveItemToCharacterPort, GiveItemToCharacterUseCase } from "../services/usecases/give-item-to-character.usecase";

@Controller('party')
export class PartyController {
    constructor(
        @Inject(PartyDiTokens.KickCharacterService)
        private readonly kickCharacterService: KickCharacterUseCase,
        @Inject(PartyDiTokens.InviteUserToPartyService)
        private readonly inviteUserToPartyService: InviteUserToPartyUseCase,
        @Inject(PartyDiTokens.JoinPartyService)
        private readonly joinPartyService: JoinPartyUseCase,
        @Inject(PartyDiTokens.LeavePartyService)
        private readonly leavePartyService: LeavePartyUseCase,
        @Inject(PartyDiTokens.SavePartyService)
        private readonly savePartyService: SavePartyUseCase,
        @Inject(PartyDiTokens.DeletePartyService)
        private readonly deletePartyService: DeletePartyUseCase,
        @Inject(PartyDiTokens.GiveItemToCharacterService)
        private readonly giveItemToCharacterService: GiveItemToCharacterUseCase
    ) {}

    @Put('kick')
    async kickCharacter(
        @Body() payload: KickCharacterPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.kickCharacterService.execute(payload);
        return { message: 'Character kicked out of the party succesfully' };
    }

    @Post('')
    async saveParty(
        @Body() payload: SavePartyPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.savePartyService.execute(payload);
        return { message: 'Party created succesfully' };
    }

    @Post('invite')
    async inviteUserToParty(
        @Body() payload: InviteUserToPartyPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.inviteUserToPartyService.execute(payload);
        return { message: 'User invited to party succesfully' };
    }

    @Delete('')
    async deletParty(
        @Request() req
    ) {
        await this.deletePartyService.execute({ userId: req.user.id });
        return { message: 'Party deleted succesfully' };
    }

    @Post('join')
    async joinParty(
        @Request() req,
        @Body() payload: JoinPartyPort
    ) {
        payload.userId = req.user.id;
        await this.joinPartyService.execute(payload);
        return { message: 'Party joined succesfully' };
    }

    @Post('leave')
    async leaveParty(
        @Request() req,
        @Body() payload: LeavePartyPort
    ) {
        payload.userId = req.user.id;
        await this.leavePartyService.execute(payload);
        return { message: 'User left party succesfully' }
    }

    @Post('give-item')
    async giveItemToCharacter(
        @Request() req,
        @Body() payload: GiveItemToCharacterPort
    ) {
        payload.userId = req.user.id;
        await this.giveItemToCharacterService.execute(payload);
        return { message: 'Item recieved' }
    }
}