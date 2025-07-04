import { Character } from "src/character/entities/abstracts/character.abstract";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { UseCase } from "src/common/usecase.common";
import { AbilityCheckResponseDto } from "src/dice/dto/ability-check-response.dto";
import { Dice } from "src/dice/types/dice.type";

export type AbilityCheckPort = {
    character: Character,
    characterAttribute: CharacterAttribute,
    difficultyClass: number
}

export interface AbilityCheckUseCase extends UseCase<AbilityCheckPort, AbilityCheckResponseDto> {};
