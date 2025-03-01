import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "activities";

// Get metrics operation
export const getActivityMetrics = createAsyncThunk(
    "activity/getActivityMetrics",
    async ({ token, from, to, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/metrics?from=${from}&to=${to}&userId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            if(!data){
                return rejectWithValue("Failed to get metrics data");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Get all activities operation
export const getAllActivities = createAsyncThunk(
    "activity/getAllActivities",
    async ({ token, page=1, limit=20, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}?page=${page}&limit=${limit}${userId ? `&userId=${userId}` : ''}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            if(!data.activities){
                return rejectWithValue(data?.error || data?.message || "Failed to get activities");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Get one activity operation
export const getOneActivity = createAsyncThunk(
    "activity/getOneActivity",
    async ({ activityId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/${activityId}`,
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
                return rejectWithValue(data?.error || data?.message || "Failed to get activity");
            }
            return data.activity;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create activity operation
export const createActivity = createAsyncThunk(
    "activity/createActivity",
    async ({ activityData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(activityData),
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to create activity");
            }
            
            return data.activity;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update activity operation
export const updateActivity = createAsyncThunk(
    "activity/updateActivity",
    async ({ activityId, activityData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}/${activityId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(activityData),
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to update activity");
            }
            
            return data.activity;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete activity operation
export const deleteActivity = createAsyncThunk(
    "activity/deleteActivity",
    async ({ activityId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}/${activityId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to delete activity");
            }
            
            return { activityId };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const activitySlice = createSlice({
    name: "activity",
    initialState: {
        activities: [],
        currentActivity: null,
        count: 0,
        loading: false,
        error: null,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 10
        },
        metrics: {
            month: 0,
            year: 0,
            totalDays: 0,
            avgTimeLogged: 0,
            avgTimeActive: 0,
            avgBreakTime: 0,
            avgInactiveTime: 0,
            totalTimeLogged: 0,
            totalTimeActive: 0,
            totalBreakTime: 0,
            totalInactiveTime: 0,
            productivityRate: 0,
            overtimeHours: 0,
            details: []
        },
        metricsLoading: false,
        metricsError: null
    },
    reducers: {
        resetActivityState: (state) => {
            state.loading = false;
            state.error = null;
            state.isCreated = false;
            state.isUpdated = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all activities
            .addCase(getAllActivities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllActivities.fulfilled, (state, action) => {
                state.loading = false;
                state.activities = action.payload.activities;
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
            .addCase(getAllActivities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Get one activity
            .addCase(getOneActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneActivity.fulfilled, (state, action) => {
                state.loading = false;
                state.currentActivity = action.payload;
                state.error = null;
            })
            .addCase(getOneActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create activity
            .addCase(createActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isCreated = false;
            })
            .addCase(createActivity.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isCreated = true;
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isCreated = false;
            })
            
            // Update activity
            .addCase(updateActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updateActivity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isUpdated = true;
                
                // Update the activity in the array
                state.activities = state.activities.map(activity => 
                    activity._id === action.payload._id
                        ? action.payload
                        : activity
                );
                
                // Update currentActivity if it's the one being updated
                if (state.currentActivity && state.currentActivity._id === action.payload._id) {
                    state.currentActivity = action.payload;
                }
            })
            .addCase(updateActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isUpdated = false;
            })
            
            // Delete activity
            .addCase(deleteActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isDeleted = true;
                
                // Remove the activity from the array
                state.activities = state.activities.filter(
                    activity => activity._id !== action.payload.activityId
                );
                
                // Clear currentActivity if it's the one being deleted
                if (state.currentActivity && state.currentActivity._id === action.payload.activityId) {
                    state.currentActivity = null;
                }
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isDeleted = false;
            })
            
            // Get activity metrics
            .addCase(getActivityMetrics.pending, (state) => {
                state.metricsLoading = true;
                state.metricsError = null;
            })
            .addCase(getActivityMetrics.fulfilled, (state, action) => {
                state.metricsLoading = false;
                state.metrics = action.payload;
                state.metricsError = null;
            })
            .addCase(getActivityMetrics.rejected, (state, action) => {
                state.metricsLoading = false;
                state.metricsError = action.payload;
            });
    },
});

export const { resetActivityState } = activitySlice.actions;
export default activitySlice.reducer;
