import { ItemRepositoryInterface } from "../repositories/item-repository.interface";
import { SaveItemPort, SaveItemUseCase } from "./usecases/save-item.usecase";

export class SaveItemService implements SaveItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepositoryInterface
    ) {}

    async execute(payload: SaveItemPort): Promise<void> {
        const { item } = payload;
        
        await this.itemRepository.save(item);
    }
}
