import { User } from "src/users/entities/user.entity";
import { Session } from "../entities/session.entity";
import { LogOutUseCase } from "./usecases/log-out.usecase";
import { ValidateSessionPort, ValidateSessionUseCase } from "./usecases/validate-session.usecase";
import { SessionRepositoryInterface } from "../repositories/session-repository.interface";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

export class ValidateSessionService implements ValidateSessionUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly logOutService: LogOutUseCase,
        private readonly sessionLifeTimeLimit: number = 7200000
    ) {} 

    async execute(payload: ValidateSessionPort): Promise<User> {
        const { sessionId } = payload;

        const session: Session = await this.sessionRepository.findById(sessionId);
        if(!session || session.hasLoggedOut) throw new UnauthorizedException();

        const sessionLifeTime: number = this.getSessionLifeTime(session);

        if(sessionLifeTime > this.sessionLifeTimeLimit) {
            await this.logOutService.execute(payload);
            throw new UnauthorizedException();
        }

        return session.user;
    }

    private getSessionLifeTime(session: Session): number {
        const sessionLifeTime = Date.now().valueOf() - new Date(session.loginDate).valueOf();
        return sessionLifeTime;
    }
}
