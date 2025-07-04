import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { DeleteCharacterPort, DeleteCharacterUseCase } from "./usecases/delete-character.usecase";

export class DeleteCharacterService implements DeleteCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: DeleteCharacterPort): Promise<void> {
        const { character } = payload;
        
        await this.characterRepository.remove(character);
    }
}
