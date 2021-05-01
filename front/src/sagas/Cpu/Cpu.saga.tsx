import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import {
    APICreateCpu,
    APIGetAllCpu,
    APIRemoveCpu,
    APIUpdateCpu,
    TAPIGetAllCpuResponse,
} from '../../api/APICpu.util';
import {
    createCpuAction,
    deleteCpuAction,
    fetchCpuAction,
    fetchCpuSuccedAction,
    updateCpuAction,
} from '../../reducers/Cpu/Cpu.reducer';

function* getCpuSaga() {
    try {
        const data: TAPIGetAllCpuResponse = yield call(APIGetAllCpu);
        yield put(fetchCpuSuccedAction(data));
    } catch (error) {
        console.log(
            '🚀 ~ file: Cpu.saga.tsx ~ line 10 ~ function*createCpuSaga ~ error',
            error
        );
    }
}

function* createCpuSaga({ payload }: ReturnType<typeof createCpuAction>) {
    try {
        yield call(APICreateCpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Cpu.saga.tsx ~ line 10 ~ function*createCpuSaga ~ error',
            error
        );
    }
}

function* updateCpuSaga({ payload }: ReturnType<typeof updateCpuAction>) {
    try {
        yield call(APIUpdateCpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Cpu.saga.tsx ~ line 10 ~ function*createCpuSaga ~ error',
            error
        );
    }
}

function* deleteCpuSaga({ payload }: ReturnType<typeof deleteCpuAction>) {
    try {
        yield call(APIRemoveCpu, payload);
    } catch (error) {
        console.log(
            '🚀 ~ file: Cpu.saga.tsx ~ line 10 ~ function*createCpuSaga ~ error',
            error
        );
    }
}

export function* CpuSaga(): Generator<ForkEffect<never>> {
    yield takeEvery(fetchCpuAction.type, getCpuSaga);
    yield takeEvery(createCpuAction.type, createCpuSaga);
    yield takeEvery(updateCpuAction.type, updateCpuSaga);
    yield takeEvery(deleteCpuAction.type, deleteCpuSaga);
}
