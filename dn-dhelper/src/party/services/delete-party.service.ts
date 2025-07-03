import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { DeletePartyPort, DeletePartyUseCase } from "./usecases/delete-party.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Party } from "../entities/party.entity";
import { DeleteCharacterUseCase } from "src/character/services/usecases/delete-character.usecase";
import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";

export class DeletePartyService implements DeletePartyUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly deleteCharacterService: DeleteCharacterUseCase
    ) {}

    async execute(payload: DeletePartyPort): Promise<void> {
        const { userId, partyId } = payload;

        const party: Party = await this.partyRepository.findByIdWithCharacterRelations(partyId);
        if(!party) throw new NotFoundException();

        if(party.leader.id != userId) throw new ForbiddenException();

        for(const character of party.members) {
            if(character instanceof NonPlayableCharacter) {
                await this.deleteCharacterService.execute({ character: character });
            }
        }
        
        await this.partyRepository.remove(party);
    }
}
