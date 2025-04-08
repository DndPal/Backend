import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { RemoveCharacterPort, RemoveCharacterUseCase } from "./usecases/remove-character.usecase";

export class RemoveCharacterService implements RemoveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: RemoveCharacterPort) {
        const { character } = payload;
        await this.characterRepository.remove(character);
    }
}