import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "warnings";

// Get all warnings operation
export const getAllWarnings = createAsyncThunk(
    "warning/getAllWarnings",
    async ({ token, page=1, limit=20, userId }, { rejectWithValue }) => {
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
            if(!data.warnings){
                return rejectWithValue(data?.error || data?.message || "Failed to get warnings");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Get one warning operation
export const getOneWarning = createAsyncThunk(
    "warning/getOneWarning",
    async ({ warningId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/${warningId}`,
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
                return rejectWithValue(data?.error || data?.message || "Failed to get warning");
            }
            return data.warning;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Mark warning as seen operation
export const markWarningAsSeen = createAsyncThunk(
    "warning/markWarningAsSeen",
    async ({ warningId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/${warningId}/seen`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            const data = await response.json();
            if (!data.success) {
                return rejectWithValue(data?.error || data?.message || "Failed to mark warning as seen");
            }
            
            return { warningId, data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Create warning operation
export const createWarning = createAsyncThunk(
    "warning/createWarning",
    async ({ warningData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(warningData),
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to create warning");
            }
            
            return data.warning;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Update warning operation
export const updateWarning = createAsyncThunk(
    "warning/updateWarning",
    async ({ warningId, warningData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}/${warningId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(warningData),
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to update warning");
            }
            
            return data.warning;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete warning operation
export const deleteWarning = createAsyncThunk(
    "warning/deleteWarning",
    async ({ warningId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/${KEY}/${warningId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            
            const data = await response.json();
            if (!data?._id) {
                return rejectWithValue(data.error || "Failed to delete warning");
            }
            
            return { warningId };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const warningSlice = createSlice({
    name: "warning",
    initialState: {
        warnings: [],
        currentWarning: null,
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
        }
    },
    reducers: {
        resetWarningState: (state) => {
            state.loading = false;
            state.error = null;
            state.isCreated = false;
            state.isUpdated = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all warnings
            .addCase(getAllWarnings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllWarnings.fulfilled, (state, action) => {
                state.loading = false;
                state.warnings = action.payload.warnings;
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
            .addCase(getAllWarnings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Get one warning
            .addCase(getOneWarning.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneWarning.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWarning = action.payload;
                state.error = null;
            })
            .addCase(getOneWarning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create warning
            .addCase(createWarning.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isCreated = false;
            })
            .addCase(createWarning.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isCreated = true;
            })
            .addCase(createWarning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isCreated = false;
            })
            
            // Mark warning as seen
            .addCase(markWarningAsSeen.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markWarningAsSeen.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                
                // Update the warning in the array
                state.warnings = state.warnings.map(warning => 
                    warning._id === action.payload.warningId
                        ? { ...warning, seen: true, seenAt: new Date().toISOString() }
                        : warning
                );
                
                // Update the count of unseen warnings if needed
                const unseenCount = state.warnings.filter(w => !w.seen).length;
                if (state.count !== unseenCount) {
                    state.count = unseenCount;
                }
                
                // Update currentWarning if it's the one being marked as seen
                if (state.currentWarning && state.currentWarning._id === action.payload.warningId) {
                    state.currentWarning = {
                        ...state.currentWarning,
                        seen: true,
                        seenAt: new Date().toISOString()
                    };
                }
            })
            .addCase(markWarningAsSeen.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update warning
            .addCase(updateWarning.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updateWarning.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isUpdated = true;
                
                // Update the warning in the array
                state.warnings = state.warnings.map(warning => 
                    warning._id === action.payload._id
                        ? action.payload
                        : warning
                );
                
                // Update currentWarning if it's the one being updated
                if (state.currentWarning && state.currentWarning._id === action.payload._id) {
                    state.currentWarning = action.payload;
                }
            })
            .addCase(updateWarning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isUpdated = false;
            })
            
            // Delete warning
            .addCase(deleteWarning.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deleteWarning.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isDeleted = true;
                
                // Remove the warning from the array
                state.warnings = state.warnings.filter(
                    warning => warning._id !== action.payload.warningId
                );
                
                // Clear currentWarning if it's the one being deleted
                if (state.currentWarning && state.currentWarning._id === action.payload.warningId) {
                    state.currentWarning = null;
                }
            })
            .addCase(deleteWarning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isDeleted = false;
            });
    },
});

export const { resetWarningState } = warningSlice.actions;
export default warningSlice.reducer;
