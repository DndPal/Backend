import { UseCase } from "src/common/usecase.common"
import { Party } from "src/party/entities/party.entity";

export type JoinPartyPort = {
    characterId: number;
    partyId: number;
    userId: number;
    invitationId: number;
}

export interface JoinPartyUseCase extends UseCase<JoinPartyPort, Party> {};
