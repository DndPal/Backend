import { NonPlayableCharacter } from "src/character/entities/non-playable-character.entity";
import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";

@EventSubscriber()
export class NonPlayableCharacterSubscriber implements EntitySubscriberInterface<NonPlayableCharacter> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return NonPlayableCharacter;
    }

    async afterUpdate(event: UpdateEvent<NonPlayableCharacter>) {
        if (event.databaseEntity.party && !event.entity.party) {
            const nonPlayableCharacter = await event.manager.findOne(NonPlayableCharacter, {
                where: { id: event.entity. id }
            });
            
            if (nonPlayableCharacter) {
                await event.manager.remove(NonPlayableCharacter, nonPlayableCharacter);
            }
        }
    }
}
