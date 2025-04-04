import { Session } from "src/authentication/entities/session.entity";
import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export type SaveSessionPort = {
    user: User
}

export interface SaveSessionUseCase extends UseCase<SaveSessionPort, Session> {};