import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesRepository } from './games.repository';
import { GamesController } from './games.controller';

@Module({
    imports: [TypeOrmModule.forFeature([GamesRepository])],
    controllers: [GamesController],
})
export class GamesModule {}
