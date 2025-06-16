import { JoinPartyPort, JoinPartyUseCase } from "./usecases/join-party.usecase";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { AssignPartyToCharacterUseCase } from "src/character/services/usecases/assign-party-to-character.usecase";
import { InvitationRepositoryInterface } from "../repositories/invitation-repository.interface";
import { Party } from "../entities/party.entity";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";

export class JoinPartyService implements JoinPartyUseCase {
    constructor(
        private readonly invitationRepository: InvitationRepositoryInterface,
        private readonly assignPartyToCharacterService: AssignPartyToCharacterUseCase,
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: JoinPartyPort): Promise<void> {
        const { characterId, partyId, userId } = payload;

        const invitation = await this.invitationRepository.findByInvitedUserIdAndPartyId(partyId, userId);
        
        if(!invitation) {
            throw new BadRequestException('Invitation does not exist');
        }

        await this.invitationRepository.remove(invitation);

        if(await this.partyIsFull(partyId)) {
            throw new UnauthorizedException('Party is full');
        }

        await this.assignPartyToCharacterService.execute({ 
            characterId: characterId, 
            partyId: partyId,
            userId: userId 
        });        
    }

    private async partyIsFull(partyId: number): Promise<boolean> {
        const party: Party = await this.partyRepository.findById(partyId);
        return party.members.length >= party.characterSlots;
    }
}