import { User } from "src/users/entities/user.entity";
import { Invitation } from "../entities/invitation.entity";
import { InvitationRepositoryInterface } from "../repositories/invitation-repository.interface";
import { InviteUserToPartyPort, InviteUserToPartyUseCase } from "./usecases/invite-character-to-party.usecase";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { Party } from "../entities/party.entity";

export class InviteUserToPartyService implements InviteUserToPartyUseCase {
    constructor(
        private readonly invitationRepository: InvitationRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase,
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: InviteUserToPartyPort): Promise<Invitation> {
        const { partyId, userId, invitedUserId } = payload;

        const party: Party = await this.partyRepository.findById(partyId);
        if(!party) throw new NotFoundException();

        if(party.leader.id != userId) throw new ForbiddenException();

        const invitedUser: User = await this.findUserByIdService.execute({ id: invitedUserId });
        if(!invitedUser) throw new NotFoundException();
        
        const existingInvitation: Invitation = await this.invitationRepository.findByInvitedUserIdAndPartyId(invitedUserId, partyId);
        if(existingInvitation) throw new ForbiddenException();

        const invitation = new Invitation();
        invitation.invitedUser = invitedUser;
        invitation.partyInvitedTo = party;
        
        await this.invitationRepository.save(invitation);

        return invitation;
    }
}
