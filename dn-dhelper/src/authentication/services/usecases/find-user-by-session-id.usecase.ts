import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export type FindUserBySessionIdPort = {
    sessionId: string;
}

export interface FindUserBySessionIdUseCase extends UseCase<FindUserBySessionIdPort, User> {}