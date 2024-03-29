import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const initURL = "https://apiecommerce-bz4f.onrender.com";

const initialState = {
  user: {},
  isLoginError: false,
  products: {},
  cartData: {},
  wishListData: {},
  userAddress:null,
  userOrder:null
};

export const login = createAsyncThunk("login", async (payload) => {
  try{
    const res = await axios.post(`${initURL}/user/login`, payload);
    return res.data;
  }
  catch(err){
    return null
  }
});

export const signup = createAsyncThunk("signup", async (payload) => {
  try{
    const res = await axios.post(`${initURL}/user/signup`, payload);
    return res.data;
  }
 catch(err){
  return null
 }
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

export const decreasItemCartCountAction = createAsyncThunk('decreasItemCartCount',async(payload)=>{
  await axios.post(`${initURL}/cart-decrease-count`,payload);
  const cart  = await getCartAndWishList(payload?.userId)
   return cart
})

export const cartRemoveAction = createAsyncThunk('cateRemove',async(payload)=>{
  await axios.post(`${initURL}/cart-remove`,payload);
  const cart  = await getCartAndWishList(payload?.userId)
   return cart
})

export const addToWishList  = createAsyncThunk('wishListAdd',async(payload)=>{
  await axios.post(`${initURL}/add-to-wishlist`,payload);
   const cart  = await getCartAndWishList(payload?.userId)
   return cart
})

export const wishListRemoveAction = createAsyncThunk('wishListRemove',async(payload)=>{
  await axios.post(`${initURL}/wishlist-remove`,payload);
  const cart  = await getCartAndWishList(payload?.userId)
   return cart
})


export const getCartAndWishList = async(userId)=>{
  const res = await axios.get(`${initURL}/cart-and-wishlist/${userId}`);
  return res.data;
}

export const getCartAndWishListAction  = createAsyncThunk('cartAndWishList',async(userId)=>{
  const res = await getCartAndWishList(userId);
  return res
})

export const addAdressAction = createAsyncThunk('addAdress',async(payload)=>{
  const res = await axios.post(`${initURL}/address`,payload);
  return res?.data
})

export const getAddressAction = createAsyncThunk('userAddress',async(userId)=>{
  const res = await axios.get(`${initURL}/address/${userId}`);
  return res?.data
})

export const updateAddressAction = createAsyncThunk('userAddress',async(payload)=>{
  const res = await axios.post(`${initURL}/update-address`,payload);
  return res?.data
})

export const placeOrdeAction = createAsyncThunk("placeOrder",async(payload)=>{
  const res = await axios.post(`${initURL}/place-order`,payload);
  const response  = await getCartAndWishList(payload?.userId)
  return {order:res.data,cartAndWishList:response}
})

export const getUserOrderAction = createAsyncThunk("getMyOder",async(userId)=>{
  const res = await axios.get(`${initURL}/my-order/${userId}`);
  return res?.data
})

const updateCartAndWishlist = (state,action)=>{
  const {payload} = action;
  const {wishList = {},cartList = {}} = payload;
  state.cartData = cartList ;
   state.wishListData = wishList;
}

const appReducer = createSlice({
  name: "ecommerceReducer",
  initialState,
  reducers: {
    addUserDataFromLS:(state,action)=>{
      const {payload} = action;
      state.user = payload
    },
    logoutUser:(state,action)=>{
      state.user = {}
      state.cartData = {}
      state.wishListData ={}
    }
  },
  extraReducers:{
        [login.pending]: (state, action) => {
        },
        [login.fulfilled]: (state, action) => {
          const {payload} = action;
         if(payload){
          state.user = payload?.user;
          state.isLoginError=false
         }
         else{
          state.isLoginError=true
         }      
        },
        [signup.fulfilled]:(state,action)=>{
          const {payload} = action
          if(payload){
            state.isLoginError=true
            state.user = payload?.user; 
          }
          else{
            state.isLoginError=false
          }
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
          updateCartAndWishlist(state,action)
        },
        [addToWishList.fulfilled]:(state,action)=>{
          updateCartAndWishlist(state,action)
        },
        [getCartAndWishListAction.fulfilled]:(state,action)=>{
          updateCartAndWishlist(state,action)
        },
        [decreasItemCartCountAction.fulfilled]:(state,action)=>{
          updateCartAndWishlist(state,action)
        },
        [cartRemoveAction.fulfilled]:(state,action)=>{
          updateCartAndWishlist(state,action)
        },
        [wishListRemoveAction.fulfilled]:(state,action)=>{
          updateCartAndWishlist(state,action)
        },
        [addAdressAction.fulfilled]:(state,action)=>{
          const {payload} =action;
          state.userAddress = payload;
        },
        [getAddressAction.fulfilled]:(state,action)=>{
          const {payload} =action;
          state.userAddress = payload; 
        },
        [placeOrdeAction.fulfilled]:(state,action)=>{
          const {payload} =action;
          const {order,cartAndWishList} = payload
          console.log(payload)
          state.userOrder = order;
          state.cartData = cartAndWishList?.cartList;
          state.wishListData = cartAndWishList?.wishList;
        },
        [getUserOrderAction.fulfilled]:(state,action)=>{
          const {payload} =action;
          state.userOrder = payload; 
        },
        [updateAddressAction.fulfilled]:(state,action)=>{
          const {payload} =action;
          state.userAddress = payload; 
        }
      },
});
export const {addUserDataFromLS,logoutUser} =  appReducer.actions
export default appReducer.reducer;


