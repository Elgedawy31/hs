import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';
import notificationReducer from './reducers/notification';

export const store = configureStore({
    reducer: {
        box: emailReducer,
        notification: notificationReducer
    }
});
