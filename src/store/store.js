import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';

export const store = configureStore({
    reducer: {
        box:emailReducer
    }
});
