import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import {
    APICreateGame,
    APIGetAllGames,
    APIRemoveGame,
    APIUpdateGame,
    TAPIGetAllGamesResponse,
} from '../../api/APIGames.util';
import {
    createGameAction,
    deleteGameAction,
    fetchGamesAction,
    fetchGamesSuccedAction,
    updateGameAction,
} from '../../reducers/Games/Games.reducer';

function* getGameSaga() {
    try {
        const data: TAPIGetAllGamesResponse = yield call(APIGetAllGames);
        yield put(fetchGamesSuccedAction(data));
    } catch (error) {
        console.log(
            '🚀 ~ file: Games.saga.tsx ~ line 10 ~ function*createGameSaga ~ error',
            error
        );
    }
}

function* createGameSaga({ payload }: ReturnType<typeof createGameAction>) {
    try {
        yield call(APICreateGame, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Games.saga.tsx ~ line 10 ~ function*createGameSaga ~ error',
            error
        );
    }
}

function* updateGameSaga({ payload }: ReturnType<typeof updateGameAction>) {
    try {
        yield call(APIUpdateGame, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Games.saga.tsx ~ line 10 ~ function*createGameSaga ~ error',
            error
        );
    }
}

function* deleteGameSaga({ payload }: ReturnType<typeof deleteGameAction>) {
    try {
        yield call(APIRemoveGame, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Games.saga.tsx ~ line 10 ~ function*createGameSaga ~ error',
            error
        );
    }
}

export function* GamesSaga(): Generator<ForkEffect<never>> {
    yield takeEvery(fetchGamesAction.type, getGameSaga);
    yield takeEvery(createGameAction.type, createGameSaga);
    yield takeEvery(updateGameAction.type, updateGameSaga);
    yield takeEvery(deleteGameAction.type, deleteGameSaga);
}
