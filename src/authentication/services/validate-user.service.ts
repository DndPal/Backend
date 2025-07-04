import { FindUserByUsernameUseCase } from "src/users/services/usecases/find-user-by-username.usecase";
import { ValidateUserPort, ValidateUserUseCase } from "./usecases/validate-user.usecase";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/entities/user.entity";

export class ValidateUserService implements ValidateUserUseCase {
    constructor(
        private readonly findByUsernameService: FindUserByUsernameUseCase
    ) {}

    async execute(payload?: ValidateUserPort): Promise<string> {
        const { username, password } = payload;
        const user: User = await this.findByUsernameService.execute({ username: username });

        if(user && await bcrypt.compare(password, user.password)) {
            const { username } = user;
            return username;
        }
        
        return null;
    }
}
