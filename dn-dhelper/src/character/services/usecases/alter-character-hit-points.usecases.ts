import { UseCase } from "src/common/usecase.common";

export type AlterCharacterHitPointsPort = {
    newValue: number,
    characterId: number,
    statName: string
}

export interface AlterCharacterHitPointsUseCase extends UseCase<AlterCharacterHitPointsPort, void> {}