import { Session } from "src/authentication/entities/session.entity"
import { UseCase } from "src/common/usecase.common"

export type FindSessionByIdPort = {
    sessionId: string
}

export interface FindSessionByIdUseCase extends UseCase<FindSessionByIdPort, Session> {}