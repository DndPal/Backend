import { ApiProperty } from "@nestjs/swagger";

export class CreatePartyResponseDto {
    @ApiProperty({ type: 'number' })
    partyLeaderId: number;

    @ApiProperty({ type: 'number' })
    partyId: number;

    @ApiProperty({ type: 'number' })
    characterSlots: number;
}
