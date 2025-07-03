import { User } from "src/users/entities/user.entity";
import { LoginUserPort, LoginUserUseCase } from "./usecases/login-user.usecase";
import { FindUserByUsernameUseCase } from "src/users/services/usecases/find-user-by-username.usecase";
import { Session } from "../entities/session.entity";
import { SessionRepositoryInterface } from "../repositories/session-repository.interface";

export class LoginUserService implements LoginUserUseCase {
    constructor(
        private readonly findUserByUsernameService: FindUserByUsernameUseCase,
        private readonly sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(payload?: LoginUserPort): Promise<string> {
        const user: User = await this.findUserByUsernameService.execute(payload);
        
        const existingValidSession: Session = await this.sessionRepository.findValidSessionByUserId(user.id);

        if(existingValidSession) {
            return existingValidSession.id;
        }

        const session: Session = await this.saveSession(user);
        
        return session.id;
    }

    private async saveSession(user: User): Promise<Session> {
        let session = new Session();
        session.user = user;

        await this.sessionRepository.save(session);
        return session;
    }
}
