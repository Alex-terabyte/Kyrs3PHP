import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { CpuReducer } from './reducers/Cpu/Cpu.reducer';
import { GamesReducer } from './reducers/Games/Games.reducer';
import { GpuReducer } from './reducers/Gpu/Gpu.reducer';
import { RamReducer } from './reducers/Ram/Ram.reducer';
import { CpuSaga } from './sagas/Cpu/Cpu.saga';
import { GamesSaga } from './sagas/Games/Games.saga';
import { GpuSaga } from './sagas/Gpu/Gpu.saga';
import { RamSaga } from './sagas/Ram/Ram.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        GamesReducer,
        RamReducer,
        CpuReducer,
        GpuReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(GamesSaga);
sagaMiddleware.run(GpuSaga);
sagaMiddleware.run(CpuSaga);
sagaMiddleware.run(RamSaga);

export type TStore = ReturnType<typeof store.getState>;
