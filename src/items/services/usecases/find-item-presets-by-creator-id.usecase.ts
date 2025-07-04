import { UseCase } from "src/common/usecase.common";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";

export type FindItemPresetsByIdPort = {
    creatorId: number;
}

export interface FindItemPresetsByCreatorIdUseCase extends UseCase<FindItemPresetsByIdPort, ItemPreset[]> {}
