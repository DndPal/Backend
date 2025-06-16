import { UseCase } from "src/common/usecase.common";

export type KickCharacterPort = {
    characterId: number,
    userId: number
}

export interface KickCharacterUseCase extends UseCase<KickCharacterPort, void> {}