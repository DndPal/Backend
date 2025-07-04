import { ApiProperty } from "@nestjs/swagger";
import { WeaponPreset } from "../entities/weapon-preset.entity";

export class SaveWeaponPresetDto {
    @ApiProperty({ type: () => WeaponPreset })
    weaponPreset: WeaponPreset;
}
