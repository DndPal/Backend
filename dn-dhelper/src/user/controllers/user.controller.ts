import { Body, Controller, Post, Inject, Delete, Get, Param } from "@nestjs/common";
import { SaveUserPort, SaveUserUseCase } from "../services/usecases/save-user.usecase";
import { UserDiTokens } from "../di/user-tokens.di";
import { RemoveUserPort } from "../services/usecases/remove-user.usecase";
import { RemoveUserService } from "../services/remove-user.service";
import { FindByUsernameService } from "../services/find-by-username.service";
import { FindByIdService } from "../services/find-by-id.service";
import { FindByUsernamePort } from "../services/usecases/find-by-username.usecase";
import { FindByIdPort } from "../services/usecases/find-by-id.usecase";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserDiTokens.SaveUserService)
        private readonly saveUserService: SaveUserUseCase,
        @Inject(UserDiTokens.RemoveUserService)
        private readonly removeUserService: RemoveUserService,
        @Inject(UserDiTokens.FindByUsernameService)
        private readonly findByUsernameService: FindByUsernameService,
        @Inject(UserDiTokens.FindByIdService)
        private readonly findByIdService: FindByIdService

    ) {}

    @Post('')
    async saveUser(
        @Body() payload: SaveUserPort
    ) {
        await this.saveUserService.execute(payload);
        return { message: "Operation succesful" };
    }

    @Delete('')
    async deleteUser(
        @Body() payload: RemoveUserPort
    ) {
        await this.removeUserService.execute(payload);
        return { message: "Operation succesful" };
    }

    @Get('')
    async findByUsername(
        @Body() payload: FindByUsernamePort
    ) {
        return await this.findByUsernameService.execute(payload);
    }

    @Get(':id')
    async findById(
        @Param('id') payload: FindByIdPort
    ) {
        return await this.findByIdService.execute(payload);
    }
}
