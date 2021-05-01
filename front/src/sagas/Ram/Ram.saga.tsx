import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import {
    APICreateRam,
    APIGetAllRam,
    APIRemoveRam,
    APIUpdateRam,
    TAPIGetAllRamResponse,
} from '../../api/APIRam.util';
import {
    createRamAction,
    deleteRamAction,
    fetchRamAction,
    fetchRamSuccedAction,
    updateRamAction,
} from '../../reducers/Ram/Ram.reducer';

function* getRamSaga() {
    try {
        const data: TAPIGetAllRamResponse = yield call(APIGetAllRam);
        yield put(fetchRamSuccedAction(data));
    } catch (error) {
        console.log(
            '🚀 ~ file: Ram.saga.tsx ~ line 10 ~ function*createRamSaga ~ error',
            error
        );
    }
}

function* createRamSaga({ payload }: ReturnType<typeof createRamAction>) {
    try {
        yield call(APICreateRam, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Ram.saga.tsx ~ line 10 ~ function*createRamSaga ~ error',
            error
        );
    }
}

function* updateRamSaga({ payload }: ReturnType<typeof updateRamAction>) {
    try {
        yield call(APIUpdateRam, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Ram.saga.tsx ~ line 10 ~ function*createRamSaga ~ error',
            error
        );
    }
}

function* deleteRamSaga({ payload }: ReturnType<typeof deleteRamAction>) {
    try {
        yield call(APIRemoveRam, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Ram.saga.tsx ~ line 10 ~ function*createRamSaga ~ error',
            error
        );
    }
}

export function* RamSaga(): Generator<ForkEffect<never>> {
    yield takeEvery(fetchRamAction.type, getRamSaga);
    yield takeEvery(createRamAction.type, createRamSaga);
    yield takeEvery(updateRamAction.type, updateRamSaga);
    yield takeEvery(deleteRamAction.type, deleteRamSaga);
}
