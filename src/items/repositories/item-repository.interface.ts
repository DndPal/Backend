import { Item } from "../entities/abstracts/item.abstract";

export interface ItemRepositoryInterface {
    save(item: Item): Promise<void>;
    findById(id: number): Promise<Item>;
    findByIdAndCharacterId(id: number, characterId: number): Promise<Item>;
    findByCharacterId(characterId: number): Promise<Item[]>;
}
