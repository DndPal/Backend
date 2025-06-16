import { UseCase } from "src/common/usecase.common";

export type DeletePartyPort = {
    userId: number
}

export interface DeletePartyUseCase extends UseCase<DeletePartyPort, void> {}