import { ApiProperty } from "@nestjs/swagger";
import { Party } from "../entities/party.entity";

export class LeavePartyResponseDto {
    @ApiProperty({ type: 'number' })
    characterId: number;

    @ApiProperty({ type: () => Party })
    characterParty: Party;
}
