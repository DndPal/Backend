import { Body, Controller, Inject, Post, Request } from "@nestjs/common";
import { SaveArmorPresetPort, SaveArmorPresetUseCase } from "../services/usecases/save-armor-preset.usecase";
import { ItemDiTokens } from "../di/item-tokens.di";
import { SaveWeaponPresetPort, SaveWeaponPresetUseCase } from "../services/usecases/save-weapon-preset.usecase";

@Controller('items')
export class ItemsController {
    constructor(
        @Inject(ItemDiTokens.SaveArmorPresetService)
        private readonly saveArmorPresetService: SaveArmorPresetUseCase,
        @Inject(ItemDiTokens.SaveWeaponPresetService)
        private readonly saveWeaponPresetService: SaveWeaponPresetUseCase
    ) {}

    @Post('save-armor-preset')
    async saveArmorPreset(
        @Body() payload: SaveArmorPresetPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.saveArmorPresetService.execute(payload);
        return { message: 'Armor preset saved succesfully' } 
    }

    @Post('save-weapon-preset')
    async saveWeaponPreset(
        @Body() payload: SaveWeaponPresetPort,
        @Request() req
    ) {
        payload.userId = req.user.id;
        await this.saveWeaponPresetService.execute(payload);
        return { message: 'Weapon preset saved succesfully' }
    }
}