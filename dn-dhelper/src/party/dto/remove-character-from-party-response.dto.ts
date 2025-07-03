import { Character } from "src/character/entities/abstracts/character.abstract";

export class RemoveCharacterFromPartyResponseDto {
    partyId: number;
    members: Character[];
    partyLeaderId: number;
    characterSlots: number;
}
