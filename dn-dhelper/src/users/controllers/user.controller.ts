import { Controller, Inject, Get, Param, Delete, Request } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindUserByIdService } from "../services/find-user-by-id.service";
import { FindUserByIdPort } from "../services/usecases/find-user-by-id.usecase";
import { RemoveUserPort, RemoveUserUseCase } from "../services/usecases/remove-user.usecase";
import { User } from "../entities/user.entity";

@Controller('users')
export class UserController {
    constructor(
        @Inject(UserDiTokens.FindUserByIdService)
        private readonly findByIdService: FindUserByIdService,
        @Inject(UserDiTokens.RemoveUserService)
        private readonly removeUserService: RemoveUserUseCase
    ) {}
    
    @Get(':id')
    async findById(
        @Param('id') payload: FindUserByIdPort
    ): Promise<User> {
        return await this.findByIdService.execute(payload);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') userToDeleteId: number,
        @Request() req
    ) {
        const payload: RemoveUserPort = {
            userToDeleteId: userToDeleteId,
            userId: req.user.id
        }
        
        await this.removeUserService.execute(payload);

        return { message: 'user deleted succesfully' };
    }
}
