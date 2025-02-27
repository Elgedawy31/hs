import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';

export const store = configureStore({
    reducer: {
        box: emailReducer,
        notification: notificationReducer,
        users: usersReducer
    }
});
