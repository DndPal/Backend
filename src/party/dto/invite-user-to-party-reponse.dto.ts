import { ApiProperty } from "@nestjs/swagger";

export class InviteUserToPartyResponseDto {
    @ApiProperty({ type: 'number' })
    invitationId: number;

    @ApiProperty({ type: 'number' })
    partyInvitedToId: number;

    @ApiProperty({ type: 'number' })
    invitedUserId: number;
}
