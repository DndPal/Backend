import { UseCase } from "src/common/usecase.common"
import { Party } from "src/party/entities/party.entity"

export type ValidateLeaderPort = {
    sessionId: string,
    partyId: number
}

export interface ValidateLeaderUseCase extends UseCase<ValidateLeaderPort, boolean> {}