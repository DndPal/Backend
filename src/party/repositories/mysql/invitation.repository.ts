import { Repository } from "typeorm";
import { InvitationRepositoryInterface } from "../invitation-repository.interface";
import { Invitation } from "src/party/entities/invitation.entity";

export class InvitationRepository implements InvitationRepositoryInterface {
    constructor(
        private readonly repository: Repository<Invitation>
    ) {}

    async save(invitation: Invitation): Promise<void> {
        await this.repository.save(invitation);
    }

    async findByInvitedUserIdAndPartyId(invitedUserId: number, partyId: number): Promise<Invitation> {
        return await this.repository.findOne({
            where: {
                partyInvitedTo: { id: partyId },
                invitedUser: { id: invitedUserId }
            }
        });
    }
    
    async remove(invitation: Invitation): Promise<void> {
        await this.repository.remove(invitation);
    }
}
