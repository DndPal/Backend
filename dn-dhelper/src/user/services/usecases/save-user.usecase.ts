import { UseCase } from "src/common/usecase.common";

export type SaveUserPort = {
    username: string,
    password: string
}

export interface SaveUserUseCase extends UseCase<SaveUserPort, void> {}
