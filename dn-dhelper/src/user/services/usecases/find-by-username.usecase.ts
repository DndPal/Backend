import { UseCase } from "src/common/usecase.common"
import { User } from "src/user/entities/user.entity"

export type FindByUsernamePort = {
    username: string;
}
export interface FindByUsernameUseCase extends UseCase<FindByUsernamePort, User> {}; 