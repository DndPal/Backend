import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { SaveUserPort, SaveUserUseCase } from "./usecases/save-user.usecase";

export class SaveUserService implements SaveUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {};
    
    async execute(payload?: SaveUserPort): Promise<void> {
        const { username, password } = payload;
        let user = new User();
        user.username = username;
        user.password = password;
        await this.userRepository.save(user);
    }
}
