import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: "",
        username: "",
        email: "",
        id: "",
    },

    reducers: {
        userDisconnect: state => {
            state.token = "";
            state.username = "";
            state.email = "";
            state.id = "";
        },
        userConnect: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.id = action.payload.id;
            state.email = action.payload.email;
        }
    }
})

export const { userDisconnect, userConnect } = userSlice.actions;

export const store = configureStore({
    reducer: userSlice.reducer
})