import { UseCase } from "src/common/usecase.common"

export type RegisterUserPort = {
    username: string;
    password: string;
}

export interface RegisterUserUseCase extends UseCase<RegisterUserPort, void> {}
