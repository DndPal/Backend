import { ItemPreset } from "../entities/abstracts/item-preset.abstract";

export interface ItemPresetRepositoryInterface {
    save(item: ItemPreset): Promise<void>;
    findById(id: number): Promise<ItemPreset>;
}