import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "apps/stats";

// Get app stats operation
export const getAppStats = createAsyncThunk(
    "apps/getAppStats",
    async ({ token, from, to, userId }, { rejectWithValue }) => {
        try {
            let url = `${API_URL}/${KEY}`;
            
            // Start building query parameters
            const params = new URLSearchParams();
            
            // Add parameters if provided
            if (from) {
                params.append('from', from);
            }
            if (to) {
                params.append('to', to);
            }
            if (userId) {
                params.append('userId', userId);
            }
            
            // Append query parameters to URL if any exist
            const queryString = params.toString();
            if (queryString) {
                url += `?${queryString}`;
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

const appsSlice = createSlice({
    name: "apps",
    initialState: {
        apps: [],
        loading: false,
        error: null
    },
    reducers: {
        resetAppsState: (state) => {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get app stats
            .addCase(getAppStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppStats.fulfilled, (state, action) => {
                state.loading = false;
                state.apps = action.payload;
                state.error = null;
            })
            .addCase(getAppStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetAppsState } = appsSlice.actions;
export default appsSlice.reducer;
