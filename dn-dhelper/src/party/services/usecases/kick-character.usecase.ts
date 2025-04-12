import { UseCase } from "src/common/usecase.common";

export type KickCharacterPort = {
    characterId: number,
    partyId: number,
    sessionId: string
}

export interface KickCharacterUseCase extends UseCase<KickCharacterPort, void> {}