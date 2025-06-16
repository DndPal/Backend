import { UnauthorizedException } from "@nestjs/common";
import { AlterCharacterStatsPort, AlterCharacterStatsUseCase } from "./usecases/alter-character-stats.usecase";
import { CharacterAttributesRepositoryInterface } from "../repositories/character-attributes-repository.interface";

export class AlterCharacterStatsService implements AlterCharacterStatsUseCase {
    constructor(
        private readonly characterAttributesRepository: CharacterAttributesRepositoryInterface
    ) {}

    async execute(payload: AlterCharacterStatsPort) {
        const { characterId } = payload;
        const characterAttributes = await this.characterAttributesRepository.findByCharacterId(characterId);

        if(!characterAttributes) {
            throw new UnauthorizedException('Character does not exist');
        }

        for (const [key, value] of Object.entries(payload)) {
            characterAttributes[key] = value;
        }

        await this.characterAttributesRepository.save(characterAttributes);
    }
}