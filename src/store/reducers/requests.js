import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "requests";

// Get all requests operation
export const getAllRequests = createAsyncThunk(
  "requests/getAllRequests",
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
      if(!data.count){
        return rejectWithValue(data?.error|| data?.message || "Failed to get requests");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get one request operation
export const getOneRequest = createAsyncThunk(
  "requests/getOneRequest",
  async ({ requestId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${requestId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data.success || data.error) {
        return rejectWithValue(data.error || "Failed to fetch request");
      }

      return data.request;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create request operation
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async ({ requestData, token }, { rejectWithValue }) => {
    try {
      // Handle file uploads if present
      let formData;
      let headers;
      
      if (requestData.files && requestData.files.length > 0) {
        // Use FormData for file uploads
        formData = new FormData();
        
        // Add request data to FormData
        formData.append('type', requestData.type);
        formData.append('priority', requestData.priority);
        formData.append('title', requestData.title);
        formData.append('description', requestData.description);
        
        // Add files to FormData
        requestData.files.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
        
        // Set headers for FormData (no Content-Type, browser will set it)
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        // No files, use JSON
        formData = JSON.stringify(requestData);
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(`${API_URL}/${KEY}`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();
      if (!data.success || data.error) {
        return rejectWithValue(data.error || "Failed to create request");
      }

      return data.request;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update request operation
export const updateRequest = createAsyncThunk(
  "requests/updateRequest",
  async ({ requestId, requestData, token }, { rejectWithValue }) => {
    try {
      // Handle file uploads if present
      let formData;
      let headers;
      
      if (requestData.files && requestData.files.length > 0) {
        // Use FormData for file uploads
        formData = new FormData();
        
        // Add request data to FormData
        formData.append('type', requestData.type);
        formData.append('priority', requestData.priority);
        formData.append('title', requestData.title);
        formData.append('description', requestData.description);
        
        // Add files to FormData
        requestData.files.forEach((file, index) => {
          formData.append(`files`, file);
        });
        
        // Set headers for FormData (no Content-Type, browser will set it)
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        // No files, use JSON
        formData = JSON.stringify(requestData);
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(`${API_URL}/${KEY}/${requestId}`, {
        method: "PUT",
        headers,
        body: formData,
      });

      const data = await response.json();
      if (!data.success || data.error) {
        return rejectWithValue(data.error || "Failed to update request");
      }

      return data.request;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete request operation
export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async ({ requestId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${requestId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data.success || data.error) {
        return rejectWithValue(data.error || "Failed to delete request");
      }

      return { requestId, message: data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get user requests operation
export const getUserRequests = createAsyncThunk(
  "requests/getUserRequests",
  async ({ userId, token, page=1, limit=20 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${KEY}/user/${userId}?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if(!data.count){
        return rejectWithValue(data?.error|| data?.message || "Failed to get user requests");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    count: 0,
    selectedRequest: null,
    loading: false,
    error: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    message: null,
    status: null, // For tracking request status (pending, approved, rejected)
  },
  reducers: {
    resetRequestsState: (state) => {
      state.loading = false;
      state.error = null;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.message = null;
    },
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
    updateRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;
      const requestIndex = state.requests.findIndex(
        (request) => request.requestId === requestId
      );
      if (requestIndex !== -1) {
        state.requests[requestIndex].status = status;
      }
      if (state.selectedRequest && state.selectedRequest.requestId === requestId) {
        state.selectedRequest.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all requests
      .addCase(getAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user requests
      .addCase(getUserRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(getUserRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get one request
      .addCase(getOneRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
        state.error = null;
      })
      .addCase(getOneRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create request
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isCreated = false;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isCreated = true;
        // Add the new request to the requests array
        state.requests.push(action.payload);
        state.count += 1;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCreated = false;
      })

      // Update request
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdated = false;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isUpdated = true;
        // Update the request in the requests array
        const index = state.requests.findIndex(
          (request) => request.requestId === action.payload.requestId
        );
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        // Update selectedRequest if it's the same request
        if (
          state.selectedRequest &&
          state.selectedRequest.requestId === action.payload.requestId
        ) {
          state.selectedRequest = action.payload;
        }
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdated = false;
      })

      // Delete request
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleted = false;
        state.message = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isDeleted = true;
        state.message = action.payload.message;
        // Remove the request from the requests array
        state.requests = state.requests.filter(
          (request) => request.requestId !== action.payload.requestId
        );
        state.count -= 1;
        // Clear selectedRequest if it's the deleted request
        if (
          state.selectedRequest &&
          state.selectedRequest.requestId === action.payload.requestId
        ) {
          state.selectedRequest = null;
        }
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleted = false;
        state.message = null;
      });
  },
});

export const { resetRequestsState, clearSelectedRequest, updateRequestStatus } = requestsSlice.actions;
export default requestsSlice.reducer;
