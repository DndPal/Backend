import { User } from "src/user/entities/user.entity";
import { Invitation } from "../entities/invitation.entity";
import { InvitationRepositoryInterface } from "../repositories/invitation-repository.interface";
import { InviteUserToPartyPort, InviteUserToPartyUseCase } from "./usecases/invite-character-to-party.usecase";
import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { UnauthorizedException } from "@nestjs/common";
import { Party } from "../entities/party.entity";

export class InviteUserToPartyService implements InviteUserToPartyUseCase {
    constructor(
        private readonly invitationRepository: InvitationRepositoryInterface,
        private readonly findUserByIdService: FindUserByIdUseCase,
    ) {}

    async execute(payload: InviteUserToPartyPort) {
        const { userId, invitedUserId } = payload;
        const user = await this.findUserByIdService.execute({ id: userId });

        if(!user.createdParty) {
            throw new UnauthorizedException('User does not own a party');
        }

        const invitation = new Invitation();
        invitation.invitedUser = { id: invitedUserId } as User;
        invitation.partyInvitedTo = user.createdParty;
        
        await this.invitationRepository.save(invitation);
    }
}