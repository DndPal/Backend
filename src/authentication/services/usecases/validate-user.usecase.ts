import { UseCase } from "src/common/usecase.common"

export type ValidateUserPort = {
    username: string;
    password: string;
}

export interface ValidateUserUseCase extends UseCase<ValidateUserPort, string> {}
