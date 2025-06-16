import { UseCase } from "src/common/usecase.common";

export type LeavePartyPort = {
    characterId: number,
    userId: number
}

export interface LeavePartyUseCase extends UseCase<LeavePartyPort, void> {}