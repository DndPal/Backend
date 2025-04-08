import { SessionRepositoryInterface } from "../repositories/session-repository.interface";
import { UpdateLogOutStatePort, UpdateLogOutStateUseCase } from "./usecases/update-log-out-state.usecase";

export class UpdateLogOutStateService implements UpdateLogOutStateUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(payload: UpdateLogOutStatePort): Promise<void> {
        const { sessionId, newState } = payload;
        await this.sessionRepository.updateLogOutState(sessionId, newState);
    }
}