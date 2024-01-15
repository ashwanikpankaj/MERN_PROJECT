import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initURL = "http://localhost:8000";

const initialState = {
  user: {},
  isLoading: false,
  products: {},
  cartData: {},
  wishListData: {},
};

export const login = createAsyncThunk("login", async (payload) => {
  const res = await axios.post(`${initURL}/user/login`, payload);
  return res.data;
});

export const signup = createAsyncThunk("signup", async (payload) => {
    const res = await axios.post(`${initURL}/user/signup`, payload);
    return res.data;
  });

export const getProducts = createAsyncThunk('allProduct', async (payload) => {
  const res = await axios.get(`${initURL}/all-product`);
  return res?.data;
});

export const getFilteredProduct = createAsyncThunk('filtereProduct',async(payload)=>{
    const res = await axios.post(`${initURL}/product/filter`,payload)
    return res.data
})

export const addToCart  = createAsyncThunk('cartAdd',async(payload)=>{
  await axios.post(`${initURL}/add-to-cart`,payload);
   const cart  = await getCartAndWishList(payload?.userId)
   return cart
})

export const addToWishList  = createAsyncThunk('wishListAdd',async(payload)=>{
  await axios.post(`${initURL}/add-to-wishlist`,payload);
   const cart  = await getCartAndWishList(payload?.userId)
   return cart
})


export const getCartAndWishList = async(userId)=>{
  const res = await axios.get(`${initURL}/cart-and-wishlist/${userId}`);
  return res.data;
}

export const getCartAndWishListAction  = createAsyncThunk('cartAndWishList',async(userId)=>{
  const res = await getCartAndWishList(userId);
  return res.data
})

const appReducer = createSlice({
  name: "ecommerceReducer",
  initialState,
  reducers: {},
  extraReducers:{
        [login.pending]: (state, action) => {
          state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
          const {payload} = action;
         state.user = payload?.user; 
        },
        [signup.fulfilled]:(state,action)=>{
          const {payload} = action
         state.user = payload?.user; 
        },
        [getProducts.fulfilled]: (state, action) => {
            const {payload} = action
           state.products = payload
        },
        [getFilteredProduct.fulfilled]:(state,action)=>{
            const {payload} = action;
            state.products = payload
        },
        [addToCart.fulfilled]:(state,action)=>{
          const {payload} = action;
          const {wishList = {},cartList = {}} = payload;
          state.cartData = cartList ;
           state.wishListData = wishList;
        },
        [addToWishList.fulfilled]:(state,action)=>{
          const {payload} = action;
          const {wishList = {},cartList = {}} = payload;
          state.cartData = cartList ;
           state.wishListData = wishList;
        },
        [getCartAndWishListAction.fulfilled]:(state,action)=>{
          const {payload} = action;
          const {wishList = {},cartList = {}} = payload;
          state.cartData = cartList ;
           state.wishListData = wishList;
        }
      },
});

export default appReducer.reducer;


