import { AxiosResponse } from 'axios';
import { API } from './API.util';

export interface IAPIGame {
    id: number;
    name: string;
    options: Array<{
        fps: number;
        koef: number;
    }>;
}

export type TAPIGetAllGamesResponse = Array<IAPIGame>;

export const APIGetAllGames = async () => {
    const r: AxiosResponse<TAPIGetAllGamesResponse> = await API.get('/games');
    return r.data;
};

export const APICreateGame = async (body: IAPIGame) => {
    await API.post('/games', body);
};

export const APIUpdateGame = async (body: IAPIGame) => {
    await API.put(`/games/${body.id}`, body);
};

export const APIRemoveGame = async (id: number) => {
    await API.delete(`/games/${id}`);
};
