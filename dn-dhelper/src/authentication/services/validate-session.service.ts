import { User } from "src/user/entities/user.entity";
import { Session } from "../entities/session.entity";
import { LogOutUseCase } from "./usecases/log-out.usecase";
import { ValidateSessionPort, ValidateSessionUseCase } from "./usecases/validate-session.usecase";
import { SessionRepositoryInterface } from "../repositories/session-repository.interface";

export class ValidateSessionService implements ValidateSessionUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly logOutService: LogOutUseCase,
        private readonly sessionLifeTimeLimit = 7200000
    ) {} 

    async execute(payload: ValidateSessionPort): Promise<User> {
        const { sessionId } = payload;
        const session = await this.sessionRepository.findSessionById(sessionId);
        const sessionLifeTime = this.getSessionLifeTime(session);

        if(!session || session.hasLoggedOut) {
            if(this.sessionLifeTimeLimit < sessionLifeTime) {
                await this.logOutService.execute(payload);
            }

            return null; 
        }

        return session.user;
    }

    private getSessionLifeTime(session: Session) {
        const sessionLifeTime = new Date().valueOf() - session.loginDate.valueOf();
        return sessionLifeTime;
    }
}