import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "logs";

// Get all logs operation
export const getAllLogs = createAsyncThunk(
    "logs/getAllLogs",
    async ({ token, page=1, limit=20, startDate, endDate }, { rejectWithValue }) => {
        try {
            let url = `${API_URL}/${KEY}?page=${page}&limit=${limit}`;
            
            // Add date filters if provided
            if (startDate) {
                url += `&startDate=${startDate}`;
            }
            if (endDate) {
                url += `&endDate=${endDate}`;
            }
            
            const response = await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            // No success check needed as per the API response format
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete log operation
export const deleteLog = createAsyncThunk(
    "logs/deleteLog",
    async ({ logId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/${logId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            if (!data.success) {
                return rejectWithValue(data?.error || data?.message || "Failed to delete log");
            }
            
            return { logId, data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const logsSlice = createSlice({
    name: "logs",
    initialState: {
        logs: [],
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 10
        }
    },
    reducers: {
        resetLogsState: (state) => {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all logs
            .addCase(getAllLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload.logs;
                state.error = null;
                // Update pagination information based on the API response format
                state.pagination = {
                    currentPage: action.payload.currentPage || 1,
                    totalPages: action.payload.totalPages || 1,
                    total: action.payload.totalItems || 0,
                    limit: state.pagination.limit
                };
            })
            .addCase(getAllLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete log
            .addCase(deleteLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Remove the deleted log from the array
                state.logs = state.logs.filter(log => 
                    log._id !== action.payload.logId
                );
            })
            .addCase(deleteLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetLogsState } = logsSlice.actions;
export default logsSlice.reducer;
