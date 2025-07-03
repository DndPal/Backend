import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";
import { Party } from "src/party/entities/party.entity";
export type AssignPartyToCharacterPort = {
    character: Character;
    party: Party;
    userId: number;
}

export interface AssignPartyToCharacterUseCase extends UseCase<AssignPartyToCharacterPort, Character> {}
