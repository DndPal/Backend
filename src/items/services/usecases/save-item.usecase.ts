import { UseCase } from "src/common/usecase.common";
import { Item } from "src/items/entities/abstracts/item.abstract";

export type SaveItemPort = {
    item: Item;
}

export interface SaveItemUseCase extends UseCase<SaveItemPort, void> {}
