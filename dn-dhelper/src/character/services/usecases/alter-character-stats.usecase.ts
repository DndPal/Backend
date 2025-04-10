import { UseCase } from "src/common/usecase.common";

export type AlterCharacterStatsPort = {
    characterId: number,
    hitPoints?: number,
    armorClass?: number,
    dexterity?: number,
    strength?: number,
    charisma?: number,
    wisdom?: number,
    constitution?: number,
    intelligence?: number
}

export interface AlterCharacterStatsUseCase extends UseCase<AlterCharacterStatsPort, void> {}