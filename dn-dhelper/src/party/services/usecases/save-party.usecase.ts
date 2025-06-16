import { UseCase } from "src/common/usecase.common"

export type SavePartyPort = {
    characterSlots: number,
    userId: number
}

export interface SavePartyUseCase extends UseCase<SavePartyPort, void> {}