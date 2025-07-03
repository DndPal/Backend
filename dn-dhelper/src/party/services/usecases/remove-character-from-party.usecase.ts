import { UseCase } from "src/common/usecase.common";
import { Party } from "src/party/entities/party.entity";

export type RemoveCharacterFromPartyPort = {
    characterId: number;
    userId: number;
    partyId: number;
}

export interface RemoveCharacterFromPartyUseCase extends UseCase<RemoveCharacterFromPartyPort, Party> {}
