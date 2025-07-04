import { JoinPartyPort, JoinPartyUseCase } from "./usecases/join-party.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { AssignPartyToCharacterUseCase } from "src/character/services/usecases/assign-party-to-character.usecase";
import { InvitationRepositoryInterface } from "../repositories/invitation-repository.interface";
import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { PlayableCharacter } from "src/character/entities/playable-character.entity";
import { Invitation } from "../entities/invitation.entity";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { User } from "src/users/entities/user.entity";

export class JoinPartyService implements JoinPartyUseCase {
    constructor(
        private readonly invitationRepository: InvitationRepositoryInterface,
        private readonly assignPartyToCharacterService: AssignPartyToCharacterUseCase,
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase
    ) {}

    async execute(payload: JoinPartyPort): Promise<Party> {
        const { characterId, partyId, userId } = payload;
                           
        const party: Party = await this.partyRepository.findById(partyId);
        if(!party) throw new NotFoundException();

        if(this.partyIsFull(party)) throw new ForbiddenException();

        const invitation: Invitation = await this.invitationRepository.findByInvitedUserIdAndPartyId(userId, partyId);
        if(!invitation) throw new NotFoundException();

        const invitedUser: User = await this.findUserByIdService.execute({ id: userId });

        const playableCharacter: PlayableCharacter = invitedUser.characters.find((character) => character.id === characterId)
        if(!playableCharacter) throw new NotFoundException();

        await this.invitationRepository.remove(invitation);

        party.members.push(playableCharacter);
        await this.assignPartyToCharacterService.execute({ 
            character: playableCharacter, 
            party: party,
            userId: userId 
        });        

        return party;
    }

    private partyIsFull(party: Party): boolean {
        let playableCharacterCount: number = 0;

        for(const character of party.members) {
            if(character instanceof PlayableCharacter) {
                playableCharacterCount++
            }
        }

        return playableCharacterCount >= party.characterSlots;
    }
}
