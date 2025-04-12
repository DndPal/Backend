import { User } from "src/user/entities/user.entity"

export type ValidateLeaderPorty = {
    user: User
}

export interface ValidateLeaderUseCase extends UseCase<ValidateLeaderPort, boolean> {}