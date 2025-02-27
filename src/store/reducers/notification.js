import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";


const KEY = "notifications";
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
        loading: false,
        error: null,
        isCreated: false,
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
