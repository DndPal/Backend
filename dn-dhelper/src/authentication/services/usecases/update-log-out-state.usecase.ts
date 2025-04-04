import { Session } from "src/authentication/entities/session.entity";
import { UseCase } from "src/common/usecase.common";

export type UpdateLogOutStatePort = {
    sessionId: string,
    newState: boolean
}
export interface UpdateLogOutStateUseCase extends UseCase<UpdateLogOutStatePort, void> {}