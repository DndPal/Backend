import { Session } from "../entities/session.entity";
import { SessionRepositoryInterface } from "../repositories/session-repository.interface";
import { FindSessionByIdPort, FindSessionByIdUseCase } from "./usecases/find-session-by-id.usecase";

export class FindSessionByIdService implements FindSessionByIdUseCase {
    constructor(
        private readonly sessionRepository: SessionRepositoryInterface
    ) {}

    async execute(payload: FindSessionByIdPort): Promise<Session> {
        const { id } = payload;
        return await this.sessionRepository.findById(id);
    }
}