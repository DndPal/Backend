import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";
import { WeaponPreset } from "src/items/entities/weapon-preset.entity";

export type SaveWeaponPresetPort = {
    baseDamage: number;
    modifierAttribute: CharacterAttribute;
    dice: Dice;
    userId: number;
    itemName: string;
}

export interface SaveWeaponPresetUseCase extends UseCase<SaveWeaponPresetPort, WeaponPreset> {}
