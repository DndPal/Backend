import { Character } from "../entities/abstracts/character.abstract";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { RemovePartyFromCharacterPort, RemovePartyFromCharacterUseCase } from "./usecases/remove-party-from-character.usecase";

export class RemovePartyFromCharacterService implements RemovePartyFromCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: RemovePartyFromCharacterPort): Promise<Character> {
        const { character } = payload        

        character.party = null;
        await this.characterRepository.save(character);

        return character
    }
}
