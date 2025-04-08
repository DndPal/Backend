import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    CharacterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}