import { ApiProperty } from "@nestjs/swagger";

export class AbilityCheckResponseDto {
    @ApiProperty({ type: 'number' })
    difficultyClass: number;

    @ApiProperty({ type: 'number' })
    rolledResult: number;

    @ApiProperty({ type: 'number' })
    abilityCheckSucceded: boolean;
}
