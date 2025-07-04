import { Character } from "src/character/entities/abstracts/character.abstract";
import { UseCase } from "src/common/usecase.common";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";
import { Item } from "src/items/entities/abstracts/item.abstract";

export type SaveItemFromItemPresetPort = {
    itemPreset: ItemPreset,
    character: Character
}

export interface SaveItemFromItemPresetUseCase extends UseCase<SaveItemFromItemPresetPort, Item> {}
