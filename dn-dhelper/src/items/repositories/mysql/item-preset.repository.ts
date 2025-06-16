import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";
import { ItemPresetRepositoryInterface } from "../item-preset-repository.interface";
import { Repository } from "typeorm";

export class ItemPresetRepository implements ItemPresetRepositoryInterface {
    constructor(
        private readonly repository: Repository<ItemPreset>
    ) {}

    async save(itemPreset: ItemPreset): Promise<void> {
        await this.repository.save(itemPreset);
    }

    async findById(id: number): Promise<ItemPreset> {
        const itemPreset = await this.repository.findOne({
            where: {
                itemPresetId: id
            }
        })

        return itemPreset;
    }

}