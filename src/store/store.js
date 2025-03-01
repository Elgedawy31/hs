import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';
import requestsReducer from './reducers/requests';
import warningReducer from './reducers/warning';

export const store = configureStore({
    reducer: {
        box: emailReducer,
        notification: notificationReducer,
        users: usersReducer,
        requests: requestsReducer,
        warning: warningReducer
    }
});
