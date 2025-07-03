import { UseCase } from "src/common/usecase.common";

export type RemoveUserPort = {
    userToDeleteId: number;
    userId: number;
}

export interface RemoveUserUseCase extends UseCase<RemoveUserPort, void> {}
