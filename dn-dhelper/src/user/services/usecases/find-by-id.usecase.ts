import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export type FindByIdPort = {
    id: number
}

export interface FindByIdUseCase extends UseCase<FindByIdPort, User> {}
