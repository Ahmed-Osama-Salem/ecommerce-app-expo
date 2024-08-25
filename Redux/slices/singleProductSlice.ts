import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface FetchSingleProductPayload {
  productId: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const fetchSingleProduct = createAsyncThunk<
  Product,
  FetchSingleProductPayload,
  { dispatch: AppDispatch }
>("singleProduct/fetchSingleProduct", async (payload, thunkAPI) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${payload.productId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: { product: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default singleProductSlice.reducer;
