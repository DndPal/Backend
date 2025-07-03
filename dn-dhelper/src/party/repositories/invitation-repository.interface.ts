import { Invitation } from "../entities/invitation.entity";

export interface InvitationRepositoryInterface {
    save(invitation: Invitation): Promise<void>,
    findByInvitedUserIdAndPartyId(invitedUserId: number, partyId: number): Promise<Invitation>,
    remove(invitation: Invitation): Promise<void>
}
