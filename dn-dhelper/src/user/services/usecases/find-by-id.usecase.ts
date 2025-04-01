import { UseCase } from "src/common/usecase.common";
import { User } from "src/user/entities/user.entity";

export interface FindByIdUseCase extends UseCase<number, User> {}
