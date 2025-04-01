import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { FindByUsernamePort, FindByUsernameUseCase } from "./usecases/find-by-username.usecase";

export class FindByUsernameService implements FindByUsernameUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: FindByUsernamePort): Promise<User> {
        const { username } = payload;
        return await this.userRepository.findByUsername(username);
    }
}
