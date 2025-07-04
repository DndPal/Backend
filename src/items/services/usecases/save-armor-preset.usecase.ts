import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";
import { ArmorPreset } from "src/items/entities/armor-preset.entity";

export type SaveArmorPresetPort = {
    modifierAttribute: CharacterAttribute;
    dice: Dice;
    baseArmorClass: number;
    userId: number;
    itemName: string;
}

export interface SaveArmorPresetUseCase extends UseCase<SaveArmorPresetPort, ArmorPreset> {}
