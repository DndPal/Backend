import { FindByUsernameUseCase } from "src/user/services/usecases/find-by-username.usecase";
import { ValidateUserPort, ValidateUserUseCase } from "./usecases/validate-user.usecase";
import * as bcrypt from 'bcrypt';

export class ValidateUserService implements ValidateUserUseCase {
    constructor(
        private readonly findByUsernameService: FindByUsernameUseCase
    ) {}

    async execute(payload?: ValidateUserPort): Promise<string> {
        const { username, password } = payload;
        const user = await this.findByUsernameService.execute({ username: username });

        if(user && await bcrypt.compare(password, user.password)) {
            const { username } = user;
            return username;
        }
        
        return null;
    }
}