import { Body, Controller, Inject, Get, Param } from "@nestjs/common";
import { UserDiTokens } from "../di/user-tokens.di";
import { FindByUsernameService } from "../services/find-by-username.service";
import { FindByIdService } from "../services/find-by-id.service";
import { FindByUsernamePort } from "../services/usecases/find-by-username.usecase";
import { FindByIdPort } from "../services/usecases/find-by-id.usecase";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserDiTokens.FindByUsernameService)
        private readonly findByUsernameService: FindByUsernameService,
        @Inject(UserDiTokens.FindByIdService)
        private readonly findByIdService: FindByIdService
    ) {}

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
