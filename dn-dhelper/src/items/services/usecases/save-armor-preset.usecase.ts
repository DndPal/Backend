import { Character } from "src/character/entities/character.entity";
import { CharacterAttribute } from "src/character/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";

export type SaveArmorPresetPort = {
    modifierAttribute: CharacterAttribute;
    dice: Dice;
    baseArmorClass: number;
    userId: number;
    itemName: string;
}

export interface SaveArmorPresetUseCase extends UseCase<SaveArmorPresetPort, void> {}