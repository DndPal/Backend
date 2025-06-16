import { UseCase } from "src/common/usecase.common";
import { Party } from "src/party/entities/party.entity";
export type AssignPartyToCharacterPort = {
    characterId: number,
    partyId: number,
    userId: number
}

export interface AssignPartyToCharacterUseCase extends UseCase<AssignPartyToCharacterPort, void> {}