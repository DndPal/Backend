import { UseCase } from "src/common/usecase.common"
import { Party } from "src/party/entities/party.entity"

export type CreatePartyPort = {
    characterSlots: number;
    userId: number;
}

export interface CreatePartyUseCase extends UseCase<CreatePartyPort, Party> {}
