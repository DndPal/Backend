import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { RemovePartyFromCharacterPort, RemovePartyrFromCharacterUseCase } from "./usecases/remove-party-from-character.usecase";

export class RemovePartyFromCharacterService implements RemovePartyrFromCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: RemovePartyFromCharacterPort) {
        const { characterId } = payload;
        const character = await this.characterRepository.findById(characterId);
        character.party = null;
        await this.characterRepository.save(character);
    }
}