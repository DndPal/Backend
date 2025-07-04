import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";

export type EquipItemPort = {
    itemId: number;
    characterId: number;
    userId: number;
}

export interface EquipItemUseCase extends UseCase<EquipItemPort, Character> {}
