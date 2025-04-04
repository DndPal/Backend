import { LogOutPort, LogOutUseCase } from "./usecases/log-out.usecase";
import { UpdateLogOutStateUseCase } from "./usecases/update-log-out-state.usecase";

export class LogOutService implements LogOutUseCase {
    constructor(
        private readonly updateLogOutState: UpdateLogOutStateUseCase
    ) {}

    async execute(payload: LogOutPort): Promise<void> { 
        const { sessionId } = payload;
        const newLogOutState = true;   
        await this.updateLogOutState.execute({ sessionId: sessionId, newState: newLogOutState })
    }
}