import { Character } from "../entities/character.entity";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { FindCharacterByIdUseCase } from "./usecases/find-character-by-id.usecase";
import { RemoveCharacterPort, RemoveCharacterUseCase } from "./usecases/remove-character.usecase";

export class RemoveCharacterService implements RemoveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly findCharacterByIdService: FindCharacterByIdUseCase
    ) {}

    async execute(payload: RemoveCharacterPort) {
        const character: Character = await this.findCharacterByIdService.execute(payload);
        await this.characterRepository.remove(character);
    }
}