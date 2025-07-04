import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { CharacterAttributes } from "../character-attributes.entity";
import { Character } from "../abstracts/character.abstract";
@EventSubscriber()
export class CharacterAttributesSubscriber implements EntitySubscriberInterface<CharacterAttributes> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return CharacterAttributes;
    }

    async afterUpdate(event: UpdateEvent<CharacterAttributes>) {
        const hitPoints = event.entity?.hitPoints;

        if (hitPoints <= 0) {
            const character = await event.manager.findOne(Character, {
                where: { id: event.entity.character.id }
            });

            if (character) {
                await event.manager.remove(character);
            }
        }
    }
}
