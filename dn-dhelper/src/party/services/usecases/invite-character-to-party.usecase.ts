import { UseCase } from "src/common/usecase.common"

export type InviteUserToPartyPort = {    
    invitedUserId: number,
    userId: number
}

export interface InviteUserToPartyUseCase extends UseCase<InviteUserToPartyPort, void> {}