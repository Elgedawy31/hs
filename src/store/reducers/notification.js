import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";


const KEY = "notifications";

// Get all notifications operation
export const getAllNotifications = createAsyncThunk(
    "notification/getAllNotifications",
    async ({ token, page=1, limit=20 , userId}, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}?page=${page}&limit=${limit}&userId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            if(!data.success){
            return rejectWithValue(data?.error|| data?.message || "Failed to get notifications");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
// Create notification operation
export const createNotification = createAsyncThunk(
    "notification/createNotification",
    async ({ notificationData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(notificationData),
            });
            
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to create notification");
            }
            
            return data.notification;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        count: 0,
        loading: false,
        error: null,
        isCreated: false,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 10
        }
    },
    reducers: {
        resetNotificationState: (state) => {
            state.loading = false;
            state.error = null;
            state.isCreated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all notifications
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.notifications;
                state.count = action.payload.count;
                state.error = null;
                // Update pagination information
                if (action.payload.pagination) {
                    state.pagination = {
                        currentPage: action.payload.pagination.currentPage || 1,
                        totalPages: action.payload.pagination.totalPages || 1,
                        total: action.payload.pagination.total || 0,
                        limit: action.payload.pagination.limit || 10
                    };
                }
            })
            .addCase(getAllNotifications.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            
            // Create notification
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isCreated = false;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isCreated = true;
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isCreated = false;
            });
    },
});

export const { resetNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;
