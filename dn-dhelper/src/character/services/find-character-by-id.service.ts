import { NotFoundException } from "@nestjs/common";
import { Character } from "../entities/abstracts/character.abstract";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { FindCharacterByIdPort, FindCharacterByIdUseCase } from "./usecases/find-character-by-id.usecase";

export class FindCharacterByIdService implements FindCharacterByIdUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: FindCharacterByIdPort): Promise<Character> {
        const { id } = payload;

        const character: Character = await this.characterRepository.findById(id);
        if(!character) throw new NotFoundException();
        
        return character;
    }
}   
