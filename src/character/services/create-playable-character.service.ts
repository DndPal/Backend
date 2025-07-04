import { CharacterAttributes } from "../entities/character-attributes.entity";
import { CharacterAttributesRepositoryInterface } from "../repositories/character-attributes-repository.interface";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { CreatePlayableCharacterPort, CreatePlayableCharacterUseCase } from "./usecases/create-playable-character.usecase";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { PlayableCharacter } from "../entities/playable-character.entity";
import { CreatePlayableCharacterResponseDto } from "../dto/create-playable-character-response.dto";

export class CreatePlayableCharacterService implements CreatePlayableCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly characterAttributesRepository: CharacterAttributesRepositoryInterface,
        private readonly findUserbyIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: CreatePlayableCharacterPort): Promise<CreatePlayableCharacterResponseDto> {
        const { userId, intelligence, dexterity, strength, charisma, wisdom, constitution, hitPoints, armorClass, name } = payload;

        const user = await this.findUserbyIdService.execute({ id: userId });
        
        const playableCharacter = new PlayableCharacter({
            user: user,
            name: name,
        });

        await this.characterRepository.save(playableCharacter);

        const characterAttributes = new CharacterAttributes({
            hitPoints: hitPoints,
            armorClass: armorClass,
            intelligence: intelligence,
            strength: strength,
            constitution: constitution,
            charisma: charisma,
            wisdom: wisdom,
            dexterity: dexterity,
            character: playableCharacter
        });

        await this.characterAttributesRepository.save(characterAttributes);

        return {
            characterId: playableCharacter.id,
            characterName: playableCharacter.name,
            characterAttributes: {
                dexterity: characterAttributes.dexterity,
                strength: characterAttributes.strength,
                wisdom: characterAttributes.wisdom,
                charisma: characterAttributes.charisma,
                intelligence: characterAttributes.intelligence,
                constitution: characterAttributes.constitution,
                hitPoints: characterAttributes.hitPoints,
                armorClass: characterAttributes.hitPoints
            },
            inventory: playableCharacter.inventory,
            equippedArmor: playableCharacter.equippedArmor,
            equippedWeapon: playableCharacter.equippedWeapon
        }
    }
}
