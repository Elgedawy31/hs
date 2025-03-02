import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "photos";

// Get all photos operation
export const getAllPhotos = createAsyncThunk(
    "photos/getAllPhotos",
    async ({ token, page=1, limit=20 }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}?page=${page}&limit=${limit}`,
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
                return rejectWithValue(data?.error|| data?.message || "Failed to get photos");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Delete photo operation
export const deletePhoto = createAsyncThunk(
    "photos/deletePhoto",
    async ({ photoId, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${API_URL}/${KEY}/${photoId}`,
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
                return rejectWithValue(data?.error || data?.message || "Failed to delete photo");
            }
            
            return { photoId, data };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const photosSlice = createSlice({
    name: "photos",
    initialState: {
        photos: [],
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 20
        }
    },
    reducers: {
        resetPhotosState: (state) => {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get all photos
            .addCase(getAllPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.photos = action.payload.photos;
                state.error = null;
                // Update pagination information
                if (action.payload.pagination) {
                    state.pagination = {
                        currentPage: action.payload.pagination.currentPage || 1,
                        totalPages: action.payload.pagination.totalPages || 1,
                        total: action.payload.pagination.total || 0,
                        limit: action.payload.pagination.limit || 20
                    };
                }
            })
            .addCase(getAllPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete photo
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Remove the deleted photo from the array
                state.photos = state.photos.filter(photo => 
                    photo._id !== action.payload.photoId
                );
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetPhotosState } = photosSlice.actions;
export default photosSlice.reducer;
