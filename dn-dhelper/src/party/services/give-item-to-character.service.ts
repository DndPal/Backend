import { FindUserByIdUseCase } from "src/user/services/usecases/find-user-by-id.usecase";
import { GiveItemToCharacterPort, GiveItemToCharacterUseCase } from "./usecases/give-item-to-character.usecase";
import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { FindItemPresetByIdUseCase } from "src/items/services/usecases/find-item-preset-by-id.usecase";
import { SaveItemUseCase } from "src/items/services/usecases/save-item.service";
import { UnauthorizedException } from "@nestjs/common";

export class GiveItemToCharacterService implements GiveItemToCharacterUseCase {
    constructor(
        private readonly findUserByIdServce: FindUserByIdUseCase,
        private readonly findCharacterByIdService: FindCharacterByIdUseCase,
        private readonly findItemPresetByIdService: FindItemPresetByIdUseCase,
        private readonly saveItemService: SaveItemUseCase
    ) {}

    async execute(payload: GiveItemToCharacterPort) {
        const { characterId, itemPresetId, userId } = payload;
        
        const itemPreset = await this.findItemPresetByIdService.execute({ itemPresetId: itemPresetId });

        const user = await this.findUserByIdServce.execute({ id: userId })
        if(!user.createdParty) throw new UnauthorizedException('User does not own a party');

        const character = await this.findCharacterByIdService.execute({ id: characterId });
        if(user.createdParty.id != character.party.id) {
            throw new UnauthorizedException('Character does not exist in this party');
        }

        await this.saveItemService.execute({ character: character, itemPreset: itemPreset });
    }
}