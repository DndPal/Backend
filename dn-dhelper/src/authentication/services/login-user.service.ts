import { LoginUserPort, LoginUserUseCase } from "./usecases/login-user.usecase";
import { SaveSessionUseCase } from "./usecases/save-session.usecase";
import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";

export class LoginUserService implements LoginUserUseCase {
    constructor(
        private readonly saveSessionService: SaveSessionUseCase,
        private readonly findUserByUsernameService: FindByUsernameUseCase
    ) {}

    async execute(payload?: LoginUserPort): Promise<string> {
        const user = await this.findUserByUsernameService.execute(payload);
        const session = await this.saveSessionService.execute({ user: user });
        return session.id;
    }
}