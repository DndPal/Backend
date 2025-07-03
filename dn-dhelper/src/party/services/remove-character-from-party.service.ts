import { RemoveCharacterFromPartyPort, RemoveCharacterFromPartyUseCase } from "./usecases/remove-character-from-party.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Character } from "src/character/entities/abstracts/character.abstract";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { Party } from "../entities/party.entity";
import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";

export class RemoveCharacterFromPartyService implements RemoveCharacterFromPartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly removePartyFromCharacterService: RemovePartyFromCharacterUseCase
    ) {}

    async execute(payload: RemoveCharacterFromPartyPort): Promise<Party> {
        const { characterId, userId, partyId } = payload;
        
        const party: Party = await this.partyRepository.findById(partyId);
        if(!party) throw new NotFoundException();
        
        if(party.leader.id != userId) throw new ForbiddenException();

        const character: Character = party.members.find((character) => character.id == characterId);
        if(!character) throw new NotFoundException();
        
        party.members = party.members.filter((member) => member.id != characterId);
        await this.removePartyFromCharacterService.execute({ character: character });

        return party;
    } 
}
