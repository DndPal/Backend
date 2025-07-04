import { NotFoundException } from "@nestjs/common";
import { PlayableCharacter } from "../entities/playable-character.entity";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { FindPlayableCharacterByIdPort, FindPlayableCharacterByIdUseCase } from "./usecases/find-playable-character-by-id.usecase";

export class FindPlayableCharacterByIdService implements FindPlayableCharacterByIdUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: FindPlayableCharacterByIdPort): Promise<PlayableCharacter> {
        const { id } = payload;

        const character: PlayableCharacter = await this.characterRepository.findPlayableCharacterById(id);
        if(!character) throw new NotFoundException();

        return character;
    }
}
