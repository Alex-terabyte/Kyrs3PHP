import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import {
    APICreateGpu,
    APIGetAllGpu,
    APIRemoveGpu,
    APIUpdateGpu,
    TAPIGetAllGpuResponse,
} from '../../api/APIGpu.util';
import {
    createGpuAction,
    deleteGpuAction,
    fetchGpuAction,
    fetchGpuSuccedAction,
    updateGpuAction,
} from '../../reducers/Gpu/Gpu.reducer';

function* getGpuSaga() {
    try {
        const data: TAPIGetAllGpuResponse = yield call(APIGetAllGpu);
        yield put(fetchGpuSuccedAction(data));
    } catch (error) {
        console.log(
            '🚀 ~ file: Gpu.saga.tsx ~ line 10 ~ function*createGpuSaga ~ error',
            error
        );
    }
}

function* createGpuSaga({ payload }: ReturnType<typeof createGpuAction>) {
    try {
        yield call(APICreateGpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Gpu.saga.tsx ~ line 10 ~ function*createGpuSaga ~ error',
            error
        );
    }
}

function* updateGpuSaga({ payload }: ReturnType<typeof updateGpuAction>) {
    try {
        yield call(APIUpdateGpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Gpu.saga.tsx ~ line 10 ~ function*createGpuSaga ~ error',
            error
        );
    }
}

function* deleteGpuSaga({ payload }: ReturnType<typeof deleteGpuAction>) {
    try {
        yield call(APIRemoveGpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Gpu.saga.tsx ~ line 10 ~ function*createGpuSaga ~ error',
            error
        );
    }
}

export function* GpuSaga(): Generator<ForkEffect<never>> {
    yield takeEvery(fetchGpuAction.type, getGpuSaga);
    yield takeEvery(createGpuAction.type, createGpuSaga);
    yield takeEvery(updateGpuAction.type, updateGpuSaga);
    yield takeEvery(deleteGpuAction.type, deleteGpuSaga);
}
