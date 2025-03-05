import {configureStore} from "@reduxjs/toolkit";
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';
import requestsReducer from './reducers/requests';
import warningReducer from './reducers/warning';
import activityReducer from './reducers/activity';
import PhotosReducer from './reducers/photos';
import logsReducer from './reducers/logs';
import appsReducer from './reducers/apps';
import bonusesReducer from './reducers/bonuses';
import onlineUsersReducer from './reducers/onlineUsers';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        users: usersReducer,
        requests: requestsReducer,
        warning: warningReducer,
        activity: activityReducer,
        photos: PhotosReducer,
        logs: logsReducer,
        apps: appsReducer,
        bonuses: bonusesReducer,
        onlineUsers: onlineUsersReducer
    }
});
