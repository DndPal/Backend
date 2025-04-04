import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "../repositories/user-repository.interface";
import { FindByIdPort, FindByIdUseCase } from "./usecases/find-by-id.usecase";

export class FindByIdService implements FindByIdUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface
    ) {}

    async execute(payload?: FindByIdPort): Promise<User> {
        const { id } = payload;
        return await this.userRepository.findById(id);
    }
}
