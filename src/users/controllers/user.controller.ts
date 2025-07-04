import { Controller, Inject, Get, Param, Delete, Request } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindUserByIdService } from "../services/find-user-by-id.service";
import { FindUserByIdPort } from "../services/usecases/find-user-by-id.usecase";
import { RemoveUserPort, RemoveUserUseCase } from "../services/usecases/remove-user.usecase";
import { User } from "../entities/user.entity";
import { FindUserByIdResponseDto } from "../dto/find-user-by-id-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        @Inject(UserDiTokens.FindUserByIdService)
        private readonly findUserByIdService: FindUserByIdService,
        @Inject(UserDiTokens.RemoveUserService)
        private readonly removeUserService: RemoveUserUseCase
    ) {}
    
    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, description: 'User returned succesfully', type: FindUserByIdResponseDto })
    async findById(
        @Param('id') payload: FindUserByIdPort
    ): Promise<FindUserByIdResponseDto> {
        const user: User = await this.findUserByIdService.execute(payload);

        return {
            id: user.id,
            username: user.username,
            characters: user.characters
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'User deleted succesfully' })
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
