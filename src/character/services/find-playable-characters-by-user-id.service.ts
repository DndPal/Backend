import { NotFoundException } from "@nestjs/common";
import { PlayableCharacter } from "../entities/playable-character.entity";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { FindPlayableCharactersByUserIdPort, FindPlayableCharactersByUserIdUseCase } from "./usecases/find-playable-characters-by-user-id.usecase";

export class FindPlayableCharactersByUserIdService implements FindPlayableCharactersByUserIdUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: FindPlayableCharactersByUserIdPort): Promise<PlayableCharacter[]> {
        const { userId } = payload;

        const playableCharacters: PlayableCharacter[] = await this.characterRepository.findPlayableCharactersByUserId(userId);
        if(!playableCharacters) throw new NotFoundException();

        return playableCharacters
    }
}
