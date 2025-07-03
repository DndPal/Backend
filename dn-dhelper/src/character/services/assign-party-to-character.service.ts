import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { AssignPartyToCharacterPort, AssignPartyToCharacterUseCase } from "./usecases/assign-party-to-character.usecase";
import { Character } from "../entities/abstracts/character.abstract";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { User } from "src/users/entities/user.entity";

export class AssignPartyToCharacterService implements AssignPartyToCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: AssignPartyToCharacterPort): Promise<Character> {
        const { character, party, userId } = payload;

        const user: User = await this.findUserByIdService.execute({ id: userId });
        if(!user) throw new NotFoundException();
 
        if(character.party) throw new UnauthorizedException();
        
        character.party = party;

        await this.characterRepository.save(character);

        return character;
    }
}
