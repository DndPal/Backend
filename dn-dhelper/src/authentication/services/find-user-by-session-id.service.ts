import { FindUserBySessionIdPort, FindUserBySessionIdUseCase } from "./usecases/find-user-by-session-id.usecase";
import { FindSessionByIdUseCase } from "./usecases/find-session-by-id.usecase";
import { User } from "src/user/entities/user.entity";

export class FindUserBySessionIdService implements FindUserBySessionIdUseCase {
    constructor(
        private readonly findSessionById: FindSessionByIdUseCase
    ) {}
    async execute(payload: FindUserBySessionIdPort): Promise<User> {
        const session = await this.findSessionById.execute(payload);
        const user = session.user;
        return user;
    }
}