import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';
import requestsReducer from './reducers/requests';

export const store = configureStore({
    reducer: {
        box: emailReducer,
        notification: notificationReducer,
        users: usersReducer,
        requests: requestsReducer
    }
});
