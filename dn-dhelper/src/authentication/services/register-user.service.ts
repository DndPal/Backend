import { SaveUserUseCase } from "src/user/services/usecases/save-user.usecase";
import { RegisterUserPort, RegisterUserUseCase } from "./usecases/register-user.usecase";
import { FindUserByUsernameUseCase } from "src/user/services/usecases/find-user-by-username.usecase";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class RegisterUserService implements RegisterUserUseCase {
    constructor(
        private readonly saveUserService: SaveUserUseCase,
        private readonly findUserByUsernameService: FindUserByUsernameUseCase
    ) {}

    async execute(payload: RegisterUserPort): Promise<void> {
        const { username, password } = payload;
        const existingUser = await this.findUserByUsernameService.execute({ username: username });

        if(existingUser) {
            throw new BadRequestException('Username already exists');
        }

        const hashedPassword = await this.hashPassword(password);
        payload.password = hashedPassword;
        await this.saveUserService.execute(payload);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        return hashedPassword;
    }


}