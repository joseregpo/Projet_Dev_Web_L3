import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: "",
        username: "",
        email: "",
        id: "",
        myDeck : [],
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
        },
        pickACard: (state, action) => {
            // state.myDeck.push(action.payload.champion);
            state.myDeck = action.payload.deck;
            console.log(state.myDeck);
            console.log(state.token)
        },
        emptyMyDeck: (state) => {
            state.myDeck.length = [];
        },

    }
})

export const { userDisconnect, userConnect, pickACard, emptyMyDeck } = userSlice.actions;

export const store = configureStore({
    reducer: userSlice.reducer
})