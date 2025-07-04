import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/character/entities/abstracts/character.abstract";

export class RemoveCharacterFromPartyResponseDto {
    @ApiProperty({ type: 'number' })
    partyId: number;

    @ApiProperty({ type: () => Character, isArray: true })
    members: Character[];

    @ApiProperty({ type: 'number' })
    partyLeaderId: number;

    @ApiProperty({ type: 'number' })
    characterSlots: number;
}
