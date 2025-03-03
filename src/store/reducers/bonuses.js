import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const KEY = "bonuses";

// Get all bonuses operation
export const getAllBonuses = createAsyncThunk(
  "bonuses/getAllBonuses",
  async ({ token, page = 1, limit = 10 }, { rejectWithValue }) => {
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
      if (!data.bonuses) {
        return rejectWithValue(data?.error || data?.message || "Failed to get bonuses");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Get one bonus operation
export const getOneBonus = createAsyncThunk(
  "bonuses/getOneBonus",
  async ({ bonusId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${bonusId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data || data.error) {
        return rejectWithValue(data?.error || "Failed to fetch bonus");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create bonus operation
export const createBonus = createAsyncThunk(
  "bonuses/createBonus",
  async ({ bonusData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bonusData),
      });

      const data = await response.json();
      if (!data || data.error) {
        return rejectWithValue(data?.error || "Failed to create bonus");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update bonus operation
export const updateBonus = createAsyncThunk(
  "bonuses/updateBonus",
  async ({ bonusId, bonusData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${bonusId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bonusData),
      });

      const data = await response.json();
      if (!data || data.error) {
        return rejectWithValue(data?.error || "Failed to update bonus");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete bonus operation
export const deleteBonus = createAsyncThunk(
  "bonuses/deleteBonus",
  async ({ bonusId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${bonusId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!data || data.error) {
        return rejectWithValue(data?.error || "Failed to delete bonus");
      }

      return { bonusId, message: data.message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Assign bonus to users
export const assignBonusToUsers = createAsyncThunk(
  "bonuses/assignBonusToUsers",
  async ({ bonusId, userIds, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${KEY}/${bonusId}/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds }),
      });

      const data = await response.json();
      if (!data || data.error) {
        return rejectWithValue(data?.error || "Failed to assign bonus to users");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const bonusesSlice = createSlice({
  name: "bonuses",
  initialState: {
    bonuses: [],
    count: 0,
    selectedBonus: null,
    loading: false,
    error: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    isAssigned: false,
    message: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      limit: 10
    }
  },
  reducers: {
    resetBonusesState: (state) => {
      state.loading = false;
      state.error = null;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.isAssigned = false;
      state.message = null;
    },
    clearSelectedBonus: (state) => {
      state.selectedBonus = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all bonuses
      .addCase(getAllBonuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBonuses.fulfilled, (state, action) => {
        state.loading = false;
        state.bonuses = action.payload.bonuses;
        state.pagination = action.payload.pagination;
        state.count = action.payload.pagination?.totalCount || 0;
        state.error = null;
      })
      .addCase(getAllBonuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get one bonus
      .addCase(getOneBonus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneBonus.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBonus = action.payload;
        state.error = null;
      })
      .addCase(getOneBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create bonus
      .addCase(createBonus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isCreated = false;
      })
      .addCase(createBonus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isCreated = true;
        // Add the new bonus to the bonuses array
        state.bonuses.push(action.payload);
        state.count += 1;
      })
      .addCase(createBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isCreated = false;
      })

      // Update bonus
      .addCase(updateBonus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdated = false;
      })
      .addCase(updateBonus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isUpdated = true;
        // Update the bonus in the bonuses array
        const index = state.bonuses.findIndex(
          (bonus) => bonus._id === action.payload._id
        );
        if (index !== -1) {
          state.bonuses[index] = action.payload;
        }
        // Update selectedBonus if it's the same bonus
        if (
          state.selectedBonus &&
          state.selectedBonus._id === action.payload._id
        ) {
          state.selectedBonus = action.payload;
        }
      })
      .addCase(updateBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdated = false;
      })

      // Delete bonus
      .addCase(deleteBonus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleted = false;
        state.message = null;
      })
      .addCase(deleteBonus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isDeleted = true;
        state.message = action.payload.message;
        // Remove the bonus from the bonuses array
        state.bonuses = state.bonuses.filter(
          (bonus) => bonus._id !== action.payload.bonusId
        );
        state.count -= 1;
        // Clear selectedBonus if it's the deleted bonus
        if (
          state.selectedBonus &&
          state.selectedBonus._id === action.payload.bonusId
        ) {
          state.selectedBonus = null;
        }
      })
      .addCase(deleteBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleted = false;
        state.message = null;
      })

      // Assign bonus to users
      .addCase(assignBonusToUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAssigned = false;
      })
      .addCase(assignBonusToUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAssigned = true;
        
        // Update the bonus in the bonuses array if it exists
        const index = state.bonuses.findIndex(
          (bonus) => bonus._id === action.payload._id
        );
        if (index !== -1) {
          state.bonuses[index] = action.payload;
        }
        
        // Update selectedBonus if it's the same bonus
        if (
          state.selectedBonus &&
          state.selectedBonus._id === action.payload._id
        ) {
          state.selectedBonus = action.payload;
        }
      })
      .addCase(assignBonusToUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAssigned = false;
      });
  },
});

export const { resetBonusesState, clearSelectedBonus } = bonusesSlice.actions;
export default bonusesSlice.reducer;
