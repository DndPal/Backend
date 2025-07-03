import { ItemPreset } from "../entities/abstracts/item-preset.abstract";
import { ItemPresetRepositoryInterface } from "../repositories/item-preset-repository.interface";
import { FindItemPresetsByCreatorIdUseCase, FindItemPresetsByIdPort } from "./usecases/find-item-presets-by-creator-id.usecase";

export class FindItemPresetsByCreatorIdService implements FindItemPresetsByCreatorIdUseCase {
    constructor(
        private readonly itemPresetRepository: ItemPresetRepositoryInterface
    ) {}

    async execute(payload: FindItemPresetsByIdPort): Promise<ItemPreset[]> {
        const { creatorId } = payload;

        const itemPresetList: ItemPreset[] = await this.itemPresetRepository.findByCreatorId(creatorId);
        
        return itemPresetList;
    }
}
