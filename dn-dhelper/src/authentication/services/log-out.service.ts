import { SessionRepositoryInterface } from "../repositories/session-repository.interface";
import { LogOutPort, LogOutUseCase } from "./usecases/log-out.usecase";

export class LogOutService implements LogOutUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(payload: LogOutPort): Promise<void> { 
        const { sessionId } = payload;
        const newLogOutState = true;   
        await this.sessionRepository.updateLogOutState(sessionId, newLogOutState)
    }
}