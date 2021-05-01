import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAPIRam, TAPIGetAllRamResponse } from '../../api/APIRam.util';
import { IRamState } from './Ram.reducer.types';

const initialState: IRamState = {
    ram: [],
};

const RamSlice = createSlice({
    name: 'Ram',
    initialState,
    reducers: {
        fetchRamAction() {
            console.log('fetch rams');
        },
        fetchRamSuccedAction(
            state,
            action: PayloadAction<TAPIGetAllRamResponse>
        ) {
            state.ram = action.payload;
        },
        createRamAction(state, action: PayloadAction<IAPIRam>) {
            state.ram.push(action.payload);
        },
        updateRamAction(state, action: PayloadAction<IAPIRam>) {
            const index = state.ram.findIndex(
                (item) => item.id === action.payload.id
            );
            state.ram[index] = action.payload;
        },
        deleteRamAction(state, action: PayloadAction<number>) {
            const index = state.ram.findIndex(
                (item) => item.id === action.payload
            );
            state.ram.splice(index, 1);
        },
    },
});

export const RamReducer = RamSlice.reducer;
export const {
    fetchRamAction,
    createRamAction,
    fetchRamSuccedAction,
    updateRamAction,
    deleteRamAction,
} = RamSlice.actions;
