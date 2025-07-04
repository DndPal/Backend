import { ApiProperty } from "@nestjs/swagger";
import { ArmorPreset } from "../entities/armor-preset.entity";

export class SaveArmorPresetDto {
    @ApiProperty({ type: () => ArmorPreset })
    armorPreset: ArmorPreset;
}
