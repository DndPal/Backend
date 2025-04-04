import { UseCase } from "src/common/usecase.common"

export type ValidateSessionPort = {
    sessionId: string
}
export interface ValidateSessionUseCase extends UseCase<ValidateSessionPort, string> {}