import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPIGame, TAPIGetAllGamesResponse } from '../../api/APIGames.util';
import { IGamesState } from './Games.reducer.types';

const initialState: IGamesState = {
    games: [],
};

const GamesSlice = createSlice({
    name: 'Games',
    initialState,
    reducers: {
        fetchGamesAction() {
            console.log('fetch games');
        },
        fetchGamesSuccedAction(
            state,
            action: PayloadAction<TAPIGetAllGamesResponse>
        ) {
            state.games = action.payload;
        },
        createGameAction(state, action: PayloadAction<IAPIGame>) {
            state.games.push(action.payload);
        },
        updateGameAction(state, action: PayloadAction<IAPIGame>) {
            const index = state.games.findIndex(
                (item) => item.id === action.payload.id
            );
            state.games[index] = action.payload;
        },
        deleteGameAction(state, action: PayloadAction<number>) {
            const index = state.games.findIndex(
                (item) => item.id === action.payload
            );
            state.games.splice(index, 1);
        },
    },
});

export const GamesReducer = GamesSlice.reducer;
export const {
    fetchGamesAction,
    createGameAction,
    fetchGamesSuccedAction,
    updateGameAction,
    deleteGameAction,
} = GamesSlice.actions;
