import { ApiProperty } from "@nestjs/swagger";

export class LoginUserServiceResponseDto {
    @ApiProperty({ type: 'string' })
    sessionId: string;
}
