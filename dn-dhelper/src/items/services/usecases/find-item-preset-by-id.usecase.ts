import { UseCase } from "src/common/usecase.common";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";

export type FindItemPresetByIdPort = {
    itemPresetId: number;
}

export interface FindItemPresetByIdUseCase extends UseCase<FindItemPresetByIdPort, ItemPreset> {}