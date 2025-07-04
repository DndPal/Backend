import { UseCase } from "src/common/usecase.common";
import { Item } from "src/items/entities/abstracts/item.abstract";

export type FindItemByIdAndCharacterIdPort = {
    itemId: number;
    characterId: number;
}

export interface FindItemByIdAndCharacterIdUseCase extends UseCase<FindItemByIdAndCharacterIdPort, Item> {}
