import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { GamesRepository } from './games.repository';

export interface ICreateGameBody {
    name: string;
    options: Array<{ koef: number; fps: number }>;
}

@Controller('games')
export class GamesController {
    constructor(
        @InjectRepository(Games) private gamesRepository: GamesRepository,
    ) {}
    @Get('/')
    getAllGames() {
        return this.gamesRepository.getAllGames();
    }

    @Post('/')
    createGame(@Body() body: ICreateGameBody) {
        this.gamesRepository.createGame(body);
    }

    @Put('/:id')
    updateGame(@Param('id') id: number, @Body() body: ICreateGameBody) {
        this.gamesRepository.updateGame(id, body);
    }

    @Delete('/:id')
    deleteGame(@Param('id') id: number) {
        this.gamesRepository.deleteGame(id);
    }
}
