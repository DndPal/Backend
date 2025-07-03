import { AddNonPlayableCharacterToPartyService } from "src/party/services/add-non-playable-character-to-party.service";
import { CharacterAttributes } from "../entities/character-attributes.entity";
import { NonPlayableCharacter } from "../entities/non-playable-character.entity";
import { CharacterAttributesRepositoryInterface } from "../repositories/character-attributes-repository.interface";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { CreateNonPlayableCharacterPort, CreateNonPlayableCharacterUseCase } from "./usecases/create-non-playable-character.usecase";
import { AddNonPlayableCharacterToPartyResponseDto } from "src/party/dto/add-non-playable-character-to-party-response.dto";

export class CreateNonPlayableCharacterService implements CreateNonPlayableCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly characterAttributesRepository: CharacterAttributesRepositoryInterface
    ) {}

    async execute(payload: CreateNonPlayableCharacterPort): Promise<AddNonPlayableCharacterToPartyResponseDto> {
        const { party, intelligence, dexterity, strength, charisma, wisdom, constitution, hitPoints, armorClass, name } = payload;

        const nonPlayableCharacter = new NonPlayableCharacter({
            party: party,
            name: name,
        });

        await this.characterRepository.save(nonPlayableCharacter);

        const characterAttributes = new CharacterAttributes({
            armorClass: armorClass,
            hitPoints: hitPoints,
            intelligence: intelligence,
            dexterity: dexterity,
            wisdom: wisdom,
            charisma: charisma,
            constitution: constitution,
            strength: strength,
            character: nonPlayableCharacter
        });

        await this.characterAttributesRepository.save(characterAttributes);

        return {
            characterId: nonPlayableCharacter.id,
            characterName: nonPlayableCharacter.name,
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
            partyId: nonPlayableCharacter.party.id,
            inventory: nonPlayableCharacter.inventory,
            equippedArmor: nonPlayableCharacter.equippedArmor,
            equippedWeapon: nonPlayableCharacter.equippedWeapon
        };
    }
}
