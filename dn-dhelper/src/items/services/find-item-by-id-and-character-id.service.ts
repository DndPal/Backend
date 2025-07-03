import { NotFoundException } from "@nestjs/common";
import { Item } from "../entities/abstracts/item.abstract";
import { ItemRepositoryInterface } from "../repositories/item-repository.interface";
import { FindItemByIdAndCharacterIdPort, FindItemByIdAndCharacterIdUseCase } from "./usecases/find-item-by-id-and-character-id.usecase";

export class FindItemByIdAndCharacterIdService implements FindItemByIdAndCharacterIdUseCase {
    constructor(
        private readonly itemRepository: ItemRepositoryInterface
    ) {}

    async execute(payload: FindItemByIdAndCharacterIdPort): Promise<Item> {
        const { itemId, characterId } = payload;

        const item: Item = await this.itemRepository.findByIdAndCharacterId(itemId, characterId);
        if(!item) throw new NotFoundException();

        return item;
    }
}
