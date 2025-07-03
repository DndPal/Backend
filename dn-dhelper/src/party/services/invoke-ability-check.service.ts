import { FindCharacterByIdUseCase } from "src/character/services/usecases/find-character-by-id.usecase";
import { InvokeAbilityCheckPort, InvokeAbilityCheckUseCase } from "./usecases/invoke-ability-check.usecase";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { Party } from "../entities/party.entity";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { Character } from "src/character/entities/abstracts/character.abstract";
import { AbilityCheckUseCase } from "src/dice/services/usecases/ability-check.usecase";
import { AbilityCheckResponseDto } from "src/dice/dto/ability-check-response.dto";

export class InvokeAbilityCheckService implements InvokeAbilityCheckUseCase {
    constructor(
        private readonly partyRepository: PartyRepositoryInterface,
        private readonly abilityCheckService: AbilityCheckUseCase
    ) {}
    
    async execute(payload: InvokeAbilityCheckPort): Promise<AbilityCheckResponseDto> {
        const { userId, characterId, characterAttribute, difficultyClass, partyId } = payload;

        const allowedAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        if(!allowedAttributes.includes(characterAttribute)) throw new BadRequestException();

        const party: Party = await this.partyRepository.findByIdWithCharacterRelations(partyId);

        if(!party) throw new NotFoundException();

        if(party.leader.id != userId) throw new ForbiddenException();

        const character: Character = party.members.find(member => member.id == characterId);
        if(!character) throw new NotFoundException();

        return await this.abilityCheckService.execute({
            difficultyClass: difficultyClass,
            character: character,
            characterAttribute: characterAttribute
        });
    }
}
