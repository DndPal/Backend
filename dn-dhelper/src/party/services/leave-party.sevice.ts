import { RemovePartyFromCharacterUseCase } from "src/character/services/usecases/remove-party-from-character.usecase";
import { LeavePartyUseCase, LeavePartyPort } from "./usecases/leave-party.usecase";
import { ForbiddenException } from "@nestjs/common";
import { Character } from "src/character/entities/abstracts/character.abstract";
import { FindPlayableCharacterByIdUseCase } from "src/character/services/usecases/find-playable-character-by-id.usecase";
import { PlayableCharacter } from "src/character/entities/playable-character.entity";

export class LeavePartyService implements LeavePartyUseCase {
    constructor(
        private readonly removePartyFromCharacterService: RemovePartyFromCharacterUseCase,
        private readonly findPlayableCharacterByIdService: FindPlayableCharacterByIdUseCase,
    ) {}

    async execute(payload: LeavePartyPort): Promise<Character> {
        const { userId, characterId, partyId } = payload;
        
        const playableCharacter: PlayableCharacter = await this.findPlayableCharacterByIdService.execute({ id: characterId });
        if(playableCharacter.party?.id != partyId || playableCharacter.user.id != userId) throw new ForbiddenException();
        
        return await this.removePartyFromCharacterService.execute({ character: playableCharacter });
    }
}
