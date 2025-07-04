import { UseCase } from "src/common/usecase.common"
import { Invitation } from "src/party/entities/invitation.entity"

export type InviteUserToPartyPort = {    
    invitedUserId: number;
    userId: number;
    partyId: number;
}

export interface InviteUserToPartyUseCase extends UseCase<InviteUserToPartyPort, Invitation> {}
