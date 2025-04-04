import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";
import { ValidateUserPort, ValidateUserUseCase } from "./usecases/validate-user.usecase";

export class ValidateUserService implements ValidateUserUseCase {
    constructor(
        private readonly findByUsernameService: FindByUsernameUseCase
    ) {}

    async execute(payload?: ValidateUserPort): Promise<any> {
        const user = await this.findByUsernameService.execute({ username: payload.username });

        if(user && user.password === payload.password) {
            const { username } = user;
            return username;
        }
        
        return null;
    }
}