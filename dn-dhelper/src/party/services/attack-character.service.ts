import { AlterCharacterAttributesUseCase } from "src/character/services/usecases/alter-character-attributes.usecase";
import { AttackCharacterPort, AttackCharacterUseCase } from "./usecases/attack-character.usecase";
import { Character } from "src/character/entities/abstracts/character.abstract";
import { DiceRollUseCase } from "src/dice/services/usecases/dice-roll.usecase";
import { User } from "src/users/entities/user.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { DeleteCharacterUseCase } from "src/character/services/usecases/delete-character.usecase";
import { FindUserByIdUseCase } from "src/users/services/usecases/find-user-by-id.usecase";
import { CharacterAttributes } from "src/character/entities/character-attributes.entity";
import { Dice } from "src/dice/types/dice.type";
import { CharacterAttribute } from "src/character/entities/types/character-attributes.type";
import { PartyRepositoryInterface } from "../repositories/party-repository.interface";
import { Party } from "../entities/party.entity";
import { AttackCharacterResponseDto } from "../dto/attack-character-response.dto";
//TODO: maybe figure out a better way to check if the character is dead
export class AttackCharacterService implements AttackCharacterUseCase {
    constructor(
        private readonly alterCharacterAttributesService: AlterCharacterAttributesUseCase,
        private readonly diceRollService: DiceRollUseCase,
        private readonly findUserByIdService: FindUserByIdUseCase,
        private readonly deleteCharacterService: DeleteCharacterUseCase,
        private readonly partyRepository: PartyRepositoryInterface
    ) {}

    async execute(payload: AttackCharacterPort): Promise<AttackCharacterResponseDto> {
        const { attackingCharacterId, defendingCharacterId, userId, partyId } = payload;

        const party: Party = await this.partyRepository.findByIdWithCharacterRelations(partyId);
        if(!party) throw new NotFoundException()

        const attackingCharacter: Character = party.members.find(member => member.id == attackingCharacterId);
        const defendingCharacter: Character = party.members.find(member => member.id == defendingCharacterId);
        if (!defendingCharacter || !attackingCharacter) throw new ForbiddenException();

        const user: User = await this.findUserByIdService.execute({ id: userId });

        if (!attackingCharacter.UserHasOwnership(user)) throw new ForbiddenException();

        const attackScoreResult = await this.calculateDamage(attackingCharacter);
        const defenceScoreResult = await this.calculateDamageNegation(defendingCharacter);

        const damageTaken = Math.max(0, attackScoreResult - defenceScoreResult);
        
        const defendingCharacterAttributes: CharacterAttributes = await this.alterCharacterAttributesService.execute({ 
            characterAttributes: defendingCharacter.characterAttributes,
            hitPoints: defendingCharacter.characterAttributes.hitPoints - damageTaken
        });

        if(defendingCharacterAttributes.hitPoints <= 0) {
            await this.deleteCharacterService.execute({ character: defendingCharacter })
        }

        return {
            updatedDefendingCharacterAttributes: defendingCharacterAttributes,
            damageTaken: damageTaken,
            defenceScoreResult: defenceScoreResult,
            attackScoreResult: attackScoreResult
        }
    }

    private async calculateDamage(character: Character): Promise<number> {
        const baseDamage: number = character.equippedWeapon?.baseDamage ?? 0;

        const dice: Dice = character.equippedWeapon?.dice ?? '1d6';

        const modifierAttribute: CharacterAttribute = character.equippedWeapon?.modifierAttribute ?? "strength";

        const randomDamage = await this.diceRollService.execute({ dice: dice }) + (Math.round(character.characterAttributes[modifierAttribute] / 3));

        return baseDamage + randomDamage;
    }

    private async calculateDamageNegation(character: Character): Promise<number> {
        const baseNegation: number = (character.equippedArmor?.baseArmorClass ?? 0) + character.characterAttributes.armorClass;

        const dice: Dice = character.equippedArmor?.dice ?? '1d6';

        const modifierAttribute: CharacterAttribute = character.equippedArmor?.modifierAttribute ?? "constitution";

        const randomNegation = await this.diceRollService.execute({ dice: dice }) + (Math.round(character.characterAttributes[modifierAttribute] / 3 ));

        return baseNegation + randomNegation;
    }
}
