import { NotFoundException } from "@nestjs/common";
import { ItemPreset } from "../entities/abstracts/item-preset.abstract";
import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { FindItemPresetByIdPort, FindItemPresetByIdUseCase } from "./usecases/find-item-preset-by-id.usecase";

export class FindItemPresetByIdService implements FindItemPresetByIdUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface
    ) {}

    async execute(payload: FindItemPresetByIdPort): Promise<ItemPreset> {
        const { itemPresetId } = payload;

        const itemPreset: ItemPreset = await this.itemPresetRepository.findById(itemPresetId);
        if(!itemPreset) throw new NotFoundException();
        
        return itemPreset;
    }
}
