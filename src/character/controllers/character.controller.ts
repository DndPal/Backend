import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Request } from "@nestjs/common";
import { CreatePlayableCharacterPort, CreatePlayableCharacterUseCase } from "../services/usecases/create-playable-character.usecase";
import { CharacterDiTokens } from "../di/character-tokens.di";
import { EquipItemPort, EquipItemUseCase } from "../services/usecases/equip-item.usecase";
import { CreatePlayableCharacterResponseDto } from "../dto/create-playable-character-response.dto";
import { PlayableCharacter } from "../entities/playable-character.entity";
import { EquipItemResponseDto } from "../dto/equip-item-response.dto";
import { Character } from "../entities/abstracts/character.abstract";
import { FindCharacterByIdPort } from "../services/usecases/find-character-by-id.usecase";
import { FindPlayableCharacterByIdUseCase } from "../services/usecases/find-playable-character-by-id.usecase";
import { FindPlayableCharacterByIdResponseDto } from "../dto/find-playable-character-by-id-response.dto";
import { DeletePlayableCharacterPort, DeletePlayableCharacterUseCase } from "../services/usecases/delete-playable-character.usecase";
import { FindPlayableCharactersByUserIdPort, FindPlayableCharactersByUserIdUseCase } from "../services/usecases/find-playable-characters-by-user-id.usecase";
import { FindPlayableCharactersByUserIdResponseDto } from "../dto/find-playable-characters-by-user-id-response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Characters')
@Controller('characters')
export class CharacterController {
    constructor(
        @Inject(CharacterDiTokens.CreatePlayableCharacterService)
        private readonly createPlayableCharacterService: CreatePlayableCharacterUseCase, 
        @Inject(CharacterDiTokens.EquipItemService)
        private readonly equipItemService: EquipItemUseCase,
        @Inject(CharacterDiTokens.FindPlayableCharacterByIdService)
        private readonly findPlayableCharacterByIdService: FindPlayableCharacterByIdUseCase,
        @Inject(CharacterDiTokens.DeletePlayableCharacterService)
        private readonly deletePlayableCharacterService: DeletePlayableCharacterUseCase,
        @Inject(CharacterDiTokens.FindPlayableCharactersByUserIdService)
        private readonly findPlayableCharactersByUserIdService: FindPlayableCharactersByUserIdUseCase
    ) {}
    
    @Post('')
    @ApiOperation({ summary: 'Create a playable character' })
    @ApiResponse({ status: 200, description: 'Playable character created succesfully', type: CreatePlayableCharacterResponseDto })
    async createPlayableCharacter(
        @Body() payload: CreatePlayableCharacterPort,
        @Request() req
    ): Promise<CreatePlayableCharacterResponseDto> {
        payload.userId = req.user.id;

        return await this.createPlayableCharacterService.execute(payload);
    }

    @Patch(':characterId/items/equip-item')
    @ApiOperation({ summary: 'Equip item on character from character inventory' })
    @ApiResponse({ status: 200, description: 'Item equipped succesfully', type: EquipItemResponseDto })
    async equipItem(
        @Body() payload: EquipItemPort,
        @Request() req,
        @Param('characterId') characterId: number
    ): Promise<EquipItemResponseDto> {
        payload.userId = req.user.id;
        payload.characterId = characterId;

        const character: Character = await this.equipItemService.execute(payload);

        return {
            characterId: character.id,
            characterName: character.name,
            characterAttributes: character.characterAttributes,
            inventory: character.inventory,
            equippedArmor: character.equippedArmor,
            equippedWeapon: character.equippedWeapon
        }
    }

    @Get(':characterId')
    @ApiOperation({ summary: 'Get playable character by id' })
    @ApiResponse({ status: 200, description: 'Playable character returned succesfully', type: FindPlayableCharacterByIdResponseDto })
    async getPlayableCharacterById(
        @Param('characterId') characterId: number,
    ): Promise<FindPlayableCharacterByIdResponseDto> {
        const payload: FindCharacterByIdPort = {
            id: characterId
        }

        const playableCharacter: PlayableCharacter = await this.findPlayableCharacterByIdService.execute(payload);

        return {
            characterId: playableCharacter.id,
            characterName: playableCharacter.name,
            characterAttributes: playableCharacter.characterAttributes,
            inventory: playableCharacter.inventory,
            equippedArmor: playableCharacter.equippedArmor,
            equippedWeapon: playableCharacter.equippedWeapon
        }
    }

    @Delete(':characterId')
    @ApiOperation({ summary: 'Delete playable character' })
    @ApiResponse({ status: 200, description: 'Playable character deleted succesfully' })
    async deletePlayableCharacter(
        @Param('characterId') characterId: number,
        @Request() req
    ) {
        const payload: DeletePlayableCharacterPort = {
            userId: req.user.id,
            characterId: characterId
        }

        await this.deletePlayableCharacterService.execute(payload);

        return { 
            message: 'character deleted succesfully' 
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all playable characters of user ' })
    @ApiResponse({ status: 200, description: 'Playable characters returned succesfully', type: FindPlayableCharactersByUserIdResponseDto })
    async findPlayableCharactersByUserId(
        @Request() req
    ): Promise<FindPlayableCharactersByUserIdResponseDto> {
        const payload: FindPlayableCharactersByUserIdPort = {
            userId: req.user.id
        }

        const playableCharacters: PlayableCharacter[] = await this.findPlayableCharactersByUserIdService.execute(payload);

        return {
            characters: playableCharacters.map(character => ({
                characterId: character.id,
                characterName: character.name,
                inventory: character.inventory,
                equippedArmor: character.equippedArmor,
                equippedWeapon: character.equippedWeapon,
                characterAttributes: character.characterAttributes
            }))
        }
    }
}
