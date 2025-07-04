import { CharacterAttributes } from "src/character/entities/character-attributes.entity";

export class AttackCharacterResponseDto {
    updatedDefendingCharacterAttributes: CharacterAttributes;
    damageTaken: number;
    defenceScoreResult: number;
    attackScoreResult: number;
}
