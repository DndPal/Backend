import { CharacterAttributes } from "../entities/character-attributes.entity";
import { Character } from "../entities/abstracts/character.entity";
import { CharacterAttributesRepositoryInterface } from "../repositories/character-attributes-repository.interface";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { SaveCharacterPort, SaveCharacterUseCase } from "./usecases/save-character.usecase";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";

export class SaveCharacterService implements SaveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly characterAttributesRepository: CharacterAttributesRepositoryInterface,
        private readonly findUserbyIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: SaveCharacterPort): Promise<void> {
        const { 
            userId,
            intelligence, 
            dexterity, 
            strength, 
            charisma, 
            wisdom, 
            constitution, 
            hitPoints, 
            armorClass 
        } = payload;

        const user = await this.findUserbyIdService.execute({ id: userId });

        const character = new Character({
            hitPoints: hitPoints,
            armorClass: armorClass,
            user: user
        });
        
        await this.characterRepository.save(character);

        console.log(character.id);

        const characterAttributes = new CharacterAttributes({
            character: character,
            intelligence: intelligence,
            strength: strength,
            constitution: constitution,
            charisma: charisma,
            wisdom: wisdom,
            dexterity: dexterity,
        })
        
        await this.characterAttributesRepository.save(characterAttributes)
    }
}