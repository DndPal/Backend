import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './users/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CharacterModule } from './character/character.module';
import { PartyModule } from './party/party.module';
import { DiceModule } from './dice/dice.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    CharacterModule,
    PartyModule,
    DiceModule,
    ItemsModule
  ]
})

export class AppModule {}
