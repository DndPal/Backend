import { UseCase } from "src/common/usecase.common";
import { Armor } from "src/items/entities/armor.entity";

export type EquipItemPort = {
    itemId: number;
    characterId: number;
    userId: number;
}

export interface EquipItemUseCase extends UseCase<EquipItemPort, void> {}