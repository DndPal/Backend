import { Session } from "../entities/session.entity";
import { SessionRepositoryInterface } from "../repositories/session-repository.interface";
import { SaveSessionPort, SaveSessionUseCase } from "./usecases/save-session.usecase";

export class SaveSessionService implements SaveSessionUseCase {
    constructor(
        private readonly sessionRespository: SessionRepositoryInterface
    ) {}

    async execute(payload?: SaveSessionPort): Promise<Session> {
        const { user } = payload;
        let session = new Session();
        session.user = user;
        await this.sessionRespository.save(session);
        return session;
    }
}   