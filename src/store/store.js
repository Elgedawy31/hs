import {configureStore} from "@reduxjs/toolkit";
import emailReducer from './reducers/email';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';
import requestsReducer from './reducers/requests';
import warningReducer from './reducers/warning';
import activityReducer from './reducers/activity';
import PhotosReducer from './reducers/photos';
import logsReducer from './reducers/logs';
import appsReducer from './reducers/apps';

export const store = configureStore({
    reducer: {
        box: emailReducer,
        notification: notificationReducer,
        users: usersReducer,
        requests: requestsReducer,
        warning: warningReducer,
        activity: activityReducer,
        photos: PhotosReducer,
        logs: logsReducer,
        apps: appsReducer
    }
});
