import { UseCase } from "src/common/usecase.common"
import { User } from "src/users/entities/user.entity"

export type ValidateSessionPort = {
    sessionId: string;
}
export interface ValidateSessionUseCase extends UseCase<ValidateSessionPort, User> {}
