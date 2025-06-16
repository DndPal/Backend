import { Body, Controller, Inject, Get, Param } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindByUsernameService } from "../services/find-user-by-username.service";
import { FindUserByIdService } from "../services/find-user-by-id.service";
import { FindUserByUsernamePort } from "../services/usecases/find-user-by-username.usecase";
import { FindUserByIdPort } from "../services/usecases/find-user-by-id.usecase";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserDiTokens.FindUserByUsernameService)
        private readonly findByUsernameService: FindByUsernameService,
        @Inject(UserDiTokens.FindUserByIdService)
        private readonly findByIdService: FindUserByIdService
    ) {}

    @Get('')
    async findByUsername(
        @Body() payload: FindUserByUsernamePort
    ) {
        return await this.findByUsernameService.execute(payload);
    }

    @Get(':id')
    async findById(
        @Param('id') payload: FindUserByIdPort
    ) {
        return await this.findByIdService.execute(payload);
    }
}
