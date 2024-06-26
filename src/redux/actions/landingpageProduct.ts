import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Product from "@/Interfaces/Product";

const URL = 'http://localhost:3000/api/v1'

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async (_, thunkAPI) => {
      
        try{
            
            const response = await axios.get(`${URL}/product/getAvailableProducts`)
            const data = response.data
            return data.availableProducts

        }
        catch(error)
        {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)
