import { Armor } from "src/items/entities/armor.entity";
import { Repository } from "typeorm";
import { ItemRepositoryInterface } from "../item-repository.interface";
import { Item } from "src/items/entities/abstracts/item.abstract";

export class ItemRepository implements ItemRepositoryInterface {
    constructor(
        private readonly repository: Repository<Item>
    ) {}

    async save(item: Item) {
        await this.repository.save(item)
    }

    async findById(id: number) {
        const item = await this.repository.findOne({
            where: {
                id: id
            }
        });

        return item;
    }

    async findByIdAndCharacterId(id: number, characterId: number): Promise<Item> {
        const item = await this.repository.findOne({
            where: {
                id: id,
                owner: { id: characterId } 
            }
        });

        return item;
    }
}  