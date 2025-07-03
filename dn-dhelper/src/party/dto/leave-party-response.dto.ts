import { Party } from "../entities/party.entity";

export class LeavePartyResponseDto {
    characterId: number;
    characterParty: Party;
}
