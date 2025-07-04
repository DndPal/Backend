import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { GetPartyByPartyIdPort, GetPartyByPartyIdUseCase } from "./usecases/get-party-by-party-id.usecase";
import { PlayableCharacter } from "src/character/entities/playable-character.entity";

export class GetPartyByPartyIdService implements GetPartyByPartyIdUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: GetPartyByPartyIdPort): Promise<Party> {
        const { partyId, userId } = payload;

        const party: Party = await this.partyRepository.findByIdWithCharacterRelations(partyId);
        if(!party) throw new NotFoundException();

        if(!this.UserBelongsToParty(userId, party)) throw new ForbiddenException();

        return party;
    }

    private UserBelongsToParty(userId: number, party: Party): boolean {
        if(party.leader.id == userId) return true;
        
        const playableCharacter: PlayableCharacter = party.members.find(member => member.user.id == userId);
        if(playableCharacter) return true;

        return false;
    }
}
