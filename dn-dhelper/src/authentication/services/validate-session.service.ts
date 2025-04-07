import { Session } from "../entities/session.entity";
import { FindSessionByIdUseCase } from "./usecases/find-session-by-id.usecase";
import { LogOutUseCase } from "./usecases/log-out.usecase";
import { ValidateSessionPort, ValidateSessionUseCase } from "./usecases/validate-session.usecase";

export class ValidateSessionService implements ValidateSessionUseCase {
    constructor(
        private readonly findSessionByIdService: FindSessionByIdUseCase,
        private readonly logOutService: LogOutUseCase,
        private readonly sessionLifeTimeLimit = 7200000
    ) {} 

    async execute(payload: ValidateSessionPort): Promise<string> {
        const session = await this.findSessionByIdService.execute(payload);
        const sessionLifeTime = this.getSessionLifeTime(session);

        if(!session || session.hasLoggedOut) {
            if(this.sessionLifeTimeLimit < sessionLifeTime) {
                await this.logOutService.execute(payload);
            }

            return null; 
        }

        return session.id;
    }

    private getSessionLifeTime(session: Session) {
        const sessionLifeTime = new Date().valueOf() - session.loginDate.valueOf();
        return sessionLifeTime;
    }
}