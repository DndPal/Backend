import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export type RemoveUserPort = {
    user: User;
}

export interface RemoveUserUseCase extends UseCase<RemoveUserPort, void> {};
