import { Character } from "../entities/character.entity";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { FindCharacterByIdPort, FindCharacterByIdUseCase } from "./usecases/find-character-by-id.usecase";

export class FindCharacterByIdService implements FindCharacterByIdUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: FindCharacterByIdPort) {
        const { id } = payload;
        const character: Character = await this.characterRepository.findById(id);
        return character;
    }
}   