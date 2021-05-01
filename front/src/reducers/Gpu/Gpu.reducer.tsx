import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPIGpu, TAPIGetAllGpuResponse } from '../../api/APIGpu.util';
import { IGpuState } from './Gpu.reducer.types';

const initialState: IGpuState = {
    gpu: [],
};

const GpuSlice = createSlice({
    name: 'Gpu',
    initialState,
    reducers: {
        fetchGpuAction() {
            console.log('fetch gpus');
        },
        fetchGpuSuccedAction(
            state,
            action: PayloadAction<TAPIGetAllGpuResponse>
        ) {
            state.gpu = action.payload;
        },
        createGpuAction(state, action: PayloadAction<IAPIGpu>) {
            state.gpu.push(action.payload);
        },
        updateGpuAction(state, action: PayloadAction<IAPIGpu>) {
            const index = state.gpu.findIndex(
                (item) => item.id === action.payload.id
            );
            state.gpu[index] = action.payload;
        },
        deleteGpuAction(state, action: PayloadAction<number>) {
            const index = state.gpu.findIndex(
                (item) => item.id === action.payload
            );
            state.gpu.splice(index, 1);
        },
    },
});

export const GpuReducer = GpuSlice.reducer;
export const {
    createGpuAction,
    fetchGpuSuccedAction,
    fetchGpuAction,
    updateGpuAction,
    deleteGpuAction,
} = GpuSlice.actions;
