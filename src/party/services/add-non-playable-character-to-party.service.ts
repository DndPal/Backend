import { CreateNonPlayableCharacterUseCase } from "src/character/services/usecases/create-non-playable-character.usecase";
import { AddNonPlayableCharacterToPartyPort, AddNonPlayableCharacterToPartyUseCase } from "./usecases/add-non-playable-character-to-party.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { Party } from "../entities/party.entity";
import { AddNonPlayableCharacterToPartyResponseDto } from "../dto/add-non-playable-character-to-party-response.dto";

export class AddNonPlayableCharacterToPartyService implements AddNonPlayableCharacterToPartyUseCase {
    constructor(
        private readonly createNonPlayableCharacterService: CreateNonPlayableCharacterUseCase,
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly nonPlayableCharacterLimit: number = 10
    ) {};

    async execute(payload: AddNonPlayableCharacterToPartyPort): Promise<AddNonPlayableCharacterToPartyResponseDto> {
        const { partyId, userId, ...rest } = payload;

        const party: Party = await this.partyRepository.findById(partyId);
        if(!party) throw new NotFoundException();

        if(party.leader.id != userId) throw new ForbiddenException();
        
        if(this.NonPlayableCharacterLimitExceeded(party)) throw new ForbiddenException();

        return await this.createNonPlayableCharacterService.execute({
            ...rest,
            party: party
        });
    }

    private NonPlayableCharacterLimitExceeded(party: Party) {
        let nonPlayableCharacterCount: number = 0;

        for(const character of party.members) {
            if(character instanceof NonPlayableCharacter) {
                nonPlayableCharacterCount++;
            }
        }

        return nonPlayableCharacterCount >= this.nonPlayableCharacterLimit;
    }
}
