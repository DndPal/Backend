import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/character/entities/abstracts/character.abstract";

export class FindUserByIdResponseDto {
    @ApiProperty({ type: 'number' })
    id: number;

    @ApiProperty({ type: 'string' })
    username: string;

    @ApiProperty({ type: () => Character, isArray: true })
    characters: Character[];
}