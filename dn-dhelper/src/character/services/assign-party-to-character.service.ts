import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CharacterRepositoryInterface } from "../repositories/character-repository.interface";
import { AssignPartyToCharacterPort, AssignPartyToCharacterUseCase } from "./usecases/assign-party-to-character.usecase";
import { Party } from "src/party/entities/party.entity";

export class AssignPartyToCharacterService implements AssignPartyToCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepositoryInterface
    ) {}

    async execute(payload: AssignPartyToCharacterPort): Promise<void> {
        const { characterId, partyId, userId } = payload;
        const character = await this.characterRepository.findCharacterByIdAndUserId(characterId, userId);

        if(!character) {
            throw new NotFoundException('Character does not exist');
        }
 
        if(character.party) {
            throw new UnauthorizedException('Character has already joined a party');
        }

        character.party = { id: partyId } as Party;
        await this.characterRepository.save(character);
    }
}