import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "users";

// Get all system users operation
export const getAllSystemUsers = createAsyncThunk(
  "users/getAllSystemUsers",
  async ({ token, page=1, limit=20 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${KEY}/system?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if(!data.users){
        return rejectWithValue(data?.error|| data?.message || "Failed to get system users");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

// Get all users operation
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
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
        return rejectWithValue(data?.error|| data?.message || "Failed to get notifications");
        }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get one user operation
export const getOneUser = createAsyncThunk(
  "users/getOneUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data?._id) {
        return rejectWithValue(data?.error || data?.message || "Failed to fetch user");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create user operation
export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!data?._id) {
        return rejectWithValue(data?.error ||data?.message || "Failed to create user");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update user operation
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!data._id) {
        return rejectWithValue(data?.error ||data?.message || "Failed to update user");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete user operation
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data?.message) {
        return rejectWithValue(data?.error || data?.message || "Failed to delete user");
      }

      return { userId, message: data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    systemUsers: [],
    count: 0,
    selectedUser: null,
    loading: false,
    error: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    message: null,
  },
  reducers: {
    resetUsersState: (state) => {
      state.loading = false;
      state.error = null;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.message = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all system users
      .addCase(getAllSystemUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSystemUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.systemUsers = action.payload.users;
        state.error = null;
      })
      .addCase(getAllSystemUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        console.log('state', state);
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get one user
      .addCase(getOneUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isCreated = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isCreated = true;
        // Add the new user to the users array
        state.users.push(action.payload);
        state.count += 1;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCreated = false;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isUpdated = true;
        // Update the user in the users array
        const index = state.users.findIndex(
          (user) => user.userId === action.payload.userId
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Update selectedUser if it's the same user
        if (
          state.selectedUser &&
          state.selectedUser.userId === action.payload.userId
        ) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdated = false;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleted = false;
        state.message = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.loading = false;
        state.error = null;
        state.isDeleted = true;
        state.message = action.payload.message;
        // Remove the user from the users array
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
        state.count -= 1;
        // Clear selectedUser if it's the deleted user
        if (
          state.selectedUser &&
          state.selectedUser.userId === action.payload.userId
        ) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleted = false;
        state.message = null;
      });
  },
});

export const { resetUsersState, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
