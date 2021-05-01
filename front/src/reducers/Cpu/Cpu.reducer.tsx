import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPICpu, TAPIGetAllCpuResponse } from '../../api/APICpu.util';
import { ICpuState } from './Cpu.reducer.types';

const initialState: ICpuState = {
    cpu: [],
};

const CpuSlice = createSlice({
    name: 'Cpu',
    initialState,
    reducers: {
        fetchCpuAction() {
            console.log('fetch cpus');
        },
        fetchCpuSuccedAction(
            state,
            action: PayloadAction<TAPIGetAllCpuResponse>
        ) {
            state.cpu = action.payload;
        },
        createCpuAction(state, action: PayloadAction<IAPICpu>) {
            state.cpu.push(action.payload);
        },
        updateCpuAction(state, action: PayloadAction<IAPICpu>) {
            const index = state.cpu.findIndex(
                (item) => item.id === action.payload.id
            );
            state.cpu[index] = action.payload;
        },
        deleteCpuAction(state, action: PayloadAction<number>) {
            const index = state.cpu.findIndex(
                (item) => item.id === action.payload
            );
            state.cpu.splice(index, 1);
        },
    },
});

export const CpuReducer = CpuSlice.reducer;
export const {
    fetchCpuAction,
    createCpuAction,
    fetchCpuSuccedAction,
    updateCpuAction,
    deleteCpuAction,
} = CpuSlice.actions;
