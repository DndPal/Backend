import { Body, Controller, Inject, Post, Request } from "@nestjs/common";
import { SaveCharacterPort, SaveCharacterUseCase } from "../services/usecases/save-character.usecase";
import { CharacterDiTokens } from "../di/character-tokens.di";

@Controller('character')
export class CharacterController {
    constructor(
        @Inject(CharacterDiTokens.SaveCharacterService)
        private readonly saveCharacterService: SaveCharacterUseCase, 
    ) {}
    @Post('')
    async saveCharacter(
        @Body() payload: SaveCharacterPort,
        @Request() req
    ) {
        payload.sessionId = req.user.sessionId;
        await this.saveCharacterService.execute(payload);
        return { message: "Character created succesfullt" };
    }


}