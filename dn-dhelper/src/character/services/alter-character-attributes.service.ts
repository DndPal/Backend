import { AlterCharacterAttributesPort, AlterCharacterAttributesUseCase as AlterCharacterAttributesUseCase } from "./usecases/alter-character-attributes.usecase";
import { CharacterAttributesRepositoryInterface } from "../repositories/character-attributes-repository.interface";
import { CharacterAttributes } from "../entities/character-attributes.entity";

export class AlterCharacterAttributesService implements AlterCharacterAttributesUseCase {
    constructor(
        private readonly characterAttributesRepository: CharacterAttributesRepositoryInterface
    ) {}

    async execute(payload: AlterCharacterAttributesPort): Promise<CharacterAttributes> {
        const { characterAttributes, ...attributes } = payload;
        for (const [key, value] of Object.entries(attributes)) {
            if(key == 'attributeId') continue;
            characterAttributes[key] = value;
        }
        
        await this.characterAttributesRepository.save(characterAttributes);
        
        return characterAttributes;
    }
}
