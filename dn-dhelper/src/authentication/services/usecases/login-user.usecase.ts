import { UseCase } from "src/common/usecase.common"

export type LoginUserPort = {
    username: string;
}

export interface LoginUserUseCase extends UseCase<LoginUserPort, string> {};
