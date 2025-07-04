import { UseCase } from "src/common/usecase.common";
import { Item } from "src/items/entities/abstracts/item.abstract";

export type ProvideItemToCharacterPort = {
    itemPresetId: number;
    characterId: number;
    userId: number;
    partyId: number;
}

export interface ProvideItemToCharacterUseCase extends UseCase<ProvideItemToCharacterPort, Item> {}
