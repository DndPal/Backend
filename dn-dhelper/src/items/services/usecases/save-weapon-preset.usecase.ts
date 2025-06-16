import { CharacterAttribute } from "src/character/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";

export type SaveWeaponPresetPort = {
    baseDamage: number;
    modifierAttribute: CharacterAttribute;
    dice: Dice;
    userId: number;
    itemName: string;
}

export interface SaveWeaponPresetUseCase extends UseCase<SaveWeaponPresetPort, void> {}