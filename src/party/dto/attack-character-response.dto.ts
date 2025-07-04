import { ApiProperty } from "@nestjs/swagger";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";

export class AttackCharacterResponseDto {
    @ApiProperty({ type: () => CharacterAttributes })
    updatedDefendingCharacterAttributes: CharacterAttributes;

    @ApiProperty({ type: 'number' })
    damageTaken: number;

    @ApiProperty({ type: 'number' })
    defenceScoreResult: number;

    @ApiProperty({ type: 'number' })
    attackScoreResult: number;
}
