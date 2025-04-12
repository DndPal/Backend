import { Body, Controller, Inject, Param, Put, Request } from "@nestjs/common";
import { PartyDiTokens } from "../di/party-tokens.di";
import { KickCharacterPort, KickCharacterUseCase } from "../services/usecases/kick-character.usecase";

@Controller('party')
export class PartyController {
    constructor(
        @Inject(PartyDiTokens.KickCharacterService)
        private readonly kickCharacterService: KickCharacterUseCase
    ) {}
    
    @Put(':id/character')
    async kickCharacter(
        @Request() req,
        @Param('id') id: number,
        @Body() payload: KickCharacterPort
    ) {
        payload.partyId = id;
        payload.sessionId = req.user.sessiondId;
        await this.kickCharacterService.execute(payload)
    }

    

}