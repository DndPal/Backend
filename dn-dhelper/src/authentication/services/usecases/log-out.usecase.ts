import { UseCase } from "src/common/usecase.common"

export type LogOutPort = {
    sessionId: string
}
export interface LogOutUseCase extends UseCase<LogOutPort, void> {};
