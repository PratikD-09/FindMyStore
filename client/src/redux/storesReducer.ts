// src/redux/slices/storeSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export type StoreType = {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  category: string;
  description: string;
  phone: string;
  created_at: string;
};

type StoreState = {
  stores: StoreType[];
  loading: boolean;
  error: string | null;
};

const initialState: StoreState = {
  stores: [],
  loading: false,
  error: null,
};

// API CALL
export const fetchStores = createAsyncThunk("stores/fetchStores", async () => {
  const res = await axios.get("http://localhost:5000/api/stores");
  return res.data as StoreType[];
});

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<StoreType>) => {
      state.stores.push(action.payload);
    },

    updateStore: (state, action: PayloadAction<StoreType>) => {
      state.stores = state.stores.map((store) =>
        store.id === action.payload.id ? action.payload : store
      );
    },

    deleteStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch stores";
      });
  },
});

export const { addStore, updateStore, deleteStore } = storeSlice.actions;

export default storeSlice.reducer;
