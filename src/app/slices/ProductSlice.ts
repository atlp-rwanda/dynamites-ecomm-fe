// In your counterSlice.ts or a similar file
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/Product';
import User from '@/types/User';
import { RootState } from '../store';

interface Payload {
  message: string;
  data: Product[];
}
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Payload>(
      `${import.meta.env.VITE_BASE_URL}/product`
    );
    return response.data.data;
  }
);

interface ProductsState {
  isLoading: boolean;
  products: Product[];
  allProducts: Product[];
}

const initialState: ProductsState = {
  isLoading: false,
  products: [
    {
      id: 1,
      name: 'Product name',
      shortDesc:
        'Ullamco tempor duis mollit ullamco incididunt culpa elit commodo.',
      salesPrice: 230,
      regularPrice: 280,
      averageRating: 4.7,
      image: 'path_to_image',
      gallery: ['path_to_image', 'path_to_image'],
      category: {
        id: 1,
        name: 'Category name',
        description: 'Category description',
      },
      longDesc: 'Long description',
      quantity: 10,
      tags: ['tag1', 'tag2'],
      type: 'Simple',
      isAvailable: true,
      reviews: [],
      vendor: {
        id: 1,
        firstName: 'Vendor',
        lastName: 'Name',
        email: 'example@gmail.com',
      } as User,
    },
  ],
  allProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    search(state, action: PayloadAction<string>) {
      const searchQuery = action.payload.trim().toLowerCase();
      return {
        ...state,
        products: state.allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.shortDesc.toLowerCase().includes(searchQuery) ||
            product.longDesc.toLowerCase().includes(searchQuery) ||
            product.category.name.toLowerCase().includes(searchQuery) ||
            product.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          products: action.payload,
          allProducts: action.payload,
        };
      })
      .addCase(fetchProducts.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

export const { setLoading, search } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;
