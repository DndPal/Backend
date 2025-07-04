import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { CharacterAttributesRepositoryInterface } from "../character-attributes-repository.interface";
import { Repository } from "typeorm";

export class CharacterAttributesRepository implements CharacterAttributesRepositoryInterface {
    constructor(
        private readonly repository: Repository<CharacterAttributes>
    ) {}

    async save(characterAttributes: CharacterAttributes): Promise<void> {
        await this.repository.save(characterAttributes)
    }

    async findByCharacterId(characterId: number): Promise<CharacterAttributes> {
        const characterAttributes: CharacterAttributes = await this.repository.findOne({
            where: {
                character: { id: characterId }
            }
        });

        return characterAttributes;
    }

    async findById(attributeId: number): Promise<CharacterAttributes> {
        return await this.repository.findOne({
            where: {
                attributeId: attributeId
            }
        })
    }
}
