import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { RemoveUserPort } from "./usecases/remove-user.usecase";

export class RemoveUserService implements RemoveUserService {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: RemoveUserPort): Promise<void> {
        const { user } = payload;
        await this.userRepository.remove(user);
    }
}
