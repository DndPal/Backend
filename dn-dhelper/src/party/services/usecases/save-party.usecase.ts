import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export type SavePartyPort = {
    user: User
}

export interface SavePartyUseCase extends UseCase<SavePartyPort, void> {}