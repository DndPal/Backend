import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";
import { ValidateUserPort, ValidateUserUseCase } from "./usecases/validate-user.usecase";

export class ValidateUserService implements ValidateUserUseCase {
    constructor(
        private readonly findByUsernameService: FindByUsernameUseCase
    ) {}

    async execute(payload?: ValidateUserPort): Promise<string> {
        const { username, password } = payload;
        const user = await this.findByUsernameService.execute({ username: username });

        if(user && user.password === password) {
            const { username } = user;
            return username;
        }
        
        return null;
    }
}