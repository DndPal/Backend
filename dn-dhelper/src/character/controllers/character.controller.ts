import { Body, Controller, Delete, Inject, Param, Post, Put, Request } from "@nestjs/common";
import { SaveCharacterPort, SaveCharacterUseCase } from "../services/usecases/save-character.usecase";
import { CharacterDiTokens } from "../di/character-tokens.di";
import { RemoveCharacterUseCase } from "../services/usecases/remove-character.usecase";
import { AlterCharacterStatsPort, AlterCharacterStatsUseCase } from "../services/usecases/alter-character-stats.usecase";

@Controller('character')
export class CharacterController {
    constructor(
        @Inject(CharacterDiTokens.SaveCharacterService)
        private readonly saveCharacterService: SaveCharacterUseCase, 
        @Inject(CharacterDiTokens.RemoveCharacterService)
        private readonly removeCharacterService: RemoveCharacterUseCase,
        @Inject(CharacterDiTokens.AlterCharacterStatsService)
        private readonly alterCharacterStatsService: AlterCharacterStatsUseCase
    ) {}
    
    @Post('')
    async saveCharacter(
        @Body() payload: SaveCharacterPort,
        @Request() req
    ) {
        payload.sessionId = req.user.sessionId;
        await this.saveCharacterService.execute(payload);
        return { message: "Character created succesfully" };
    }

    @Delete(':id')
    async deleteCharacter(
        @Param('id') id: number
    ) {
        await this.removeCharacterService.execute({ id: id });
        return { message: "Character deleted succesfully" };
    }

    @Put(':id')
    async alterCharacterStat(
        @Body() payload: AlterCharacterStatsPort,
        @Param('id') id: number
    ) {
        payload.characterId = id;
        await this.alterCharacterStatsService.execute(payload);
        return { message: "Character stat altered succesfully" }
    }
}