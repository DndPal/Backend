import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { DeletePlayableCharacterPort, DeletePlayableCharacterUseCase } from "./usecases/delete-playable-character.usecase";
import { PlayableCharacter } from "../entities/playable-character.entity";

export class DeletePlayableCharacterService implements DeletePlayableCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: DeletePlayableCharacterPort): Promise<void> {
        const { userId, characterId } = payload;

        const playableCharacter: PlayableCharacter = await this.characterRepository.findPlayableCharacterById(characterId);

        if (!playableCharacter) throw new NotFoundException();

        if (playableCharacter.user.id != userId) throw new ForbiddenException();

        await this.characterRepository.remove(playableCharacter);
    }
}
