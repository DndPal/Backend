import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { AlterCharacterStatsPort, AlterCharacterStatsUseCase } from "./usecases/alter-character-stats.usecase";

export class AlterCharacterStatsService implements AlterCharacterStatsUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: AlterCharacterStatsPort) {
        const { statName, newValue, characterId } = payload;
        await this.characterRepository.update(characterId, statName, newValue);
    }
}