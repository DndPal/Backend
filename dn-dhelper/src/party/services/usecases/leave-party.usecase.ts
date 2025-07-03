import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";

export type LeavePartyPort = {
    characterId: number;
    userId: number;
    partyId: number;
}

export interface LeavePartyUseCase extends UseCase<LeavePartyPort, Character> {}
