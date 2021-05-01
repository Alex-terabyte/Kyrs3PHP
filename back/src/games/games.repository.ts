import { EntityRepository, Repository } from 'typeorm';
import { ICreateGameBody } from './games.controller';
import { Games } from './games.entity';

@EntityRepository(Games)
export class GamesRepository extends Repository<Games> {
    getAllGames() {
        return this.find();
    }
    async createGame(body: ICreateGameBody) {
        const game = new Games();
        game.name = body.name;
        game.options = body.options;
        await game.save();
    }

    async updateGame(id: number, body: ICreateGameBody) {
        const updatingGame = await this.findOne(id);
        (updatingGame.name = body.name), (updatingGame.options = body.options);
        await updatingGame.save();
    }

    async deleteGame(id: number) {
        const deletingGame = await this.findOne(id);
        await deletingGame.remove();
    }
}
