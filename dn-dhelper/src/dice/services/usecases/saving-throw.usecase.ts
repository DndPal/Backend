import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { Dice } from "src/dice/types/dice.type";

export type AbilityCheckPort = {
    characterAttributes: CharacterAttributes,
    dice: Dice,
    characterAttribute: CharacterAttribute,
    difficultyClass: number
}

export interface AbilityCheckUseCase extends UseCase<AbilityCheckPort, boolean> {};
