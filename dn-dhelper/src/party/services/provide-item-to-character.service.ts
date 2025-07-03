import { ProvideItemToCharacterPort, ProvideItemToCharacterUseCase } from "./usecases/provide-item-to-character.usecase";
import { FindItemPresetByIdUseCase } from "src/items/services/usecases/find-item-preset-by-id.usecase";
import { SaveItemFromItemPresetUseCase } from "src/items/services/usecases/save-item-from-item-preset.usecase";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ItemPreset } from "src/items/entities/abstracts/item-preset.abstract";
import { Character } from "src/character/entities/abstracts/character.abstract";
import { Item } from "src/items/entities/abstracts/item.abstract";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { Party } from "../entities/party.entity";
//TODO: dto needs to return item type
export class ProvideItemToCharacterService implements ProvideItemToCharacterUseCase {
    constructor(
        private readonly findItemPresetByIdService: FindItemPresetByIdUseCase,
        private readonly saveItemFromItemPresetService: SaveItemFromItemPresetUseCase,
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: ProvideItemToCharacterPort): Promise<Item> {
        const { partyId, characterId, itemPresetId, userId } = payload;
        const itemPreset: ItemPreset = await this.findItemPresetByIdService.execute({ itemPresetId: itemPresetId });

        const party: Party = await this.partyRepository.findById(partyId);
        if (!party) throw new NotFoundException();

        if(party.leader.id !== userId) throw new ForbiddenException();

        const character: Character = party.members.find((character) => character.id == characterId);
        if (!character) throw new NotFoundException();
        
        return await this.saveItemFromItemPresetService.execute({ character: character, itemPreset: itemPreset });
    }
}
