import { Character } from "src/character/entities/character.entity";
import { UseCase } from "src/common/usecase.common";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";

export type SaveItemPort = {
    itemPreset: ItemPreset,
    character: Character
}

export interface SaveItemUseCase extends UseCase<SaveItemPort, void> {}