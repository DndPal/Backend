import { Character } from "src/character/entities/character.entity";
import { UseCase } from "src/common/usecase.common";

export type AlterCharacterStatsPort = {
    statName: string,
    newValue: number,
    characterId: number

}

export interface AlterCharacterStatsUseCase extends UseCase<AlterCharacterStatsPort, void> {}