import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FormState {
    occupation: string;
    fieldType: string;
}

const initialState: FormState = {
    occupation: '',
    fieldType: '',
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setOccupation: (state, action: PayloadAction<string>) => {
            state.occupation = action.payload;
        },
        setFieldType: (state, action: PayloadAction<string>) => {
            state.fieldType = action.payload;
        },
    },
});

export const { setOccupation, setFieldType } = formSlice.actions;

export const selectOccupation = (state: RootState) => state.form.occupation;
export const selectFieldType = (state: RootState) => state.form.fieldType;

export default formSlice.reducer;
