import { Invitation } from "../entities/invitation.entity";
import { Party } from "../entities/party.entity";

export interface InvitationRepositoryInterface {
    save(invitation: Invitation): Promise<void>,
    findByInvitedUserIdAndPartyId(userId: number, partyId: number): Promise<Invitation>,
    remove(invitation: Invitation): Promise<void>
}