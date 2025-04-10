import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { AlterCharacterStatsPort, AlterCharacterStatsUseCase } from "./usecases/alter-character-stats.usecase";
import { FindCharacterByIdUseCase } from "./usecases/find-character-by-id.usecase";
import { SaveCharacterUseCase } from "./usecases/save-character.usecase";

export class AlterCharacterStatsService implements AlterCharacterStatsUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: AlterCharacterStatsPort) {
        const { characterId } = payload;
        const character = await this.characterRepository.findById(characterId);

        for (const [key, value] of Object.entries(payload)) {
            character[key] = value;
        }

        await this.characterRepository.save(character);
    }
}