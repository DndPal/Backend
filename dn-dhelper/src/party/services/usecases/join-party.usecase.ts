import { UseCase } from "src/common/usecase.common"

export type JoinPartyPort = {
    characterId: number,
    partyId: number,
    userId: number
}

export interface JoinPartyUseCase extends UseCase<JoinPartyPort, void> {};