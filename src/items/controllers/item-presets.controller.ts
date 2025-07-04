import { Body, Controller, Get, Inject, Param, Post, Request } from "@nestjs/common";
import { ItemDiTokens } from "../di/item-tokens.di";
import { SaveArmorPresetPort, SaveArmorPresetUseCase } from "../services/usecases/save-armor-preset.usecase";
import { SaveWeaponPresetPort, SaveWeaponPresetUseCase } from "../services/usecases/save-weapon-preset.usecase";
import { ArmorPreset } from "../entities/armor-preset.entity";
import { WeaponPreset } from "../entities/weapon-preset.entity";
import { FindItemPresetByIdUseCase } from "../services/usecases/find-item-preset-by-id.usecase";
import { ItemPreset } from "../entities/abstracts/item-preset.abstract";
import { SaveArmorPresetDto } from "../dto/save-armor-preset.dto";
import { SaveWeaponPresetDto } from "../dto/save-weapon-preset.dto";
import { FindItemPresetsByCreatorIdUseCase } from "../services/usecases/find-item-presets-by-creator-id.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Items')
@Controller('item-presets')
export class itemPresetsController {
    constructor(
        @Inject(ItemDiTokens.SaveArmorPresetService)
        private readonly saveArmorPresetService: SaveArmorPresetUseCase,
        @Inject(ItemDiTokens.SaveWeaponPresetService)
        private readonly saveWeaponPresetService: SaveWeaponPresetUseCase,
        @Inject(ItemDiTokens.FindItemPresetByIdService)
        private readonly findItemPresetByIdService: FindItemPresetByIdUseCase,
        @Inject(ItemDiTokens.FindItemPresetsByCreatorIdService)
        private readonly findItemPresetsByCreatorIdService: FindItemPresetsByCreatorIdUseCase
    ) {}

    @Post('armors')
    @ApiOperation({ summary: 'Save armor preset' })
    @ApiResponse({ status: 200, description: 'Armor preset saved succesfully', type: SaveArmorPresetDto })
    async saveArmorPreset(
        @Body() payload: SaveArmorPresetPort,
        @Request() req
    ): Promise<SaveArmorPresetDto> {
        payload.userId = req.user.id;

        const armorPreset: ArmorPreset = await this.saveArmorPresetService.execute(payload);

        return {
            armorPreset: armorPreset
        }
    }

    @Post('weapons')
    @ApiOperation({ summary: 'Save weapon preset' })
    @ApiResponse({ status: 200, description: 'Weapon preset saved succesfully', type: SaveWeaponPresetDto })
    async saveWeaponPreset(
        @Body() payload: SaveWeaponPresetPort,
        @Request() req
    ): Promise<SaveWeaponPresetDto> {
        payload.userId = req.user.id;

        const weaponPreset: WeaponPreset = await this.saveWeaponPresetService.execute(payload);

        return {
            weaponPreset: weaponPreset
        }
    }

    @Get(':itemPresetId')
    @ApiOperation({ summary: 'Get item preset by id' })
    @ApiResponse({ status: 200, description: 'Item preset returned succesfully', type: ItemPreset })
    async findItemPresetById(
        @Param('id') itemPresetId: number
    ): Promise<ItemPreset> {
       return await this.findItemPresetByIdService.execute({ itemPresetId: itemPresetId }); 
    }

    @ApiOperation({ summary: 'Get all item presets by creator id' })
    @ApiResponse({ status: 200, description: 'Item presets returned succesfully', type: ItemPreset })
    @Get('users/:userId')
    async findItemPresetsByCreatorId(
        @Param('userId') userId: number
    ): Promise<ItemPreset[]> {
        return await this.findItemPresetsByCreatorIdService.execute({ creatorId: userId });
    }
}
