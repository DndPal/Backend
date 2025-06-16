import { Body, Controller, Inject, Param, Post, Put, Request } from "@nestjs/common";
import { SaveCharacterPort, SaveCharacterUseCase } from "../services/usecases/save-character.usecase";
import { CharacterDiTokens } from "../di/character-tokens.di";
import { AlterCharacterStatsPort, AlterCharacterStatsUseCase } from "../services/usecases/alter-character-stats.usecase";
import { EquipItemPort, EquipItemUseCase } from "../services/usecases/equip-armor.usecase";

@Controller('character')
export class CharacterController {
    constructor(
        @Inject(CharacterDiTokens.SaveCharacterService)
        private readonly saveCharacterService: SaveCharacterUseCase, 
        @Inject(CharacterDiTokens.AlterCharacterStatsService)
        private readonly alterCharacterStatsService: AlterCharacterStatsUseCase,
        @Inject(CharacterDiTokens.EquipItemService)
        private readonly equipItemService: EquipItemUseCase
    ) {}
    
    @Post('')
    async saveCharacter(
        @Body() payload: SaveCharacterPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.saveCharacterService.execute(payload);
        return { message: "Character created succesfully" };
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

    @Post('equip-item')
    async equipItem(
        @Body() payload: EquipItemPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.equipItemService.execute(payload);
        return { message: 'Item equipped succesfully' }
    }
}