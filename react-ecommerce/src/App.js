import React,{useEffect} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import _isEmpty from 'lodash/isEmpty';

import Home from './pages/home';
import Cart from './pages/cart/Cart';
import Navbar from './components/navbar/Navbar';
import WishList from './pages/wishList/WishList';
import { addUserDataFromLS, getCartAndWishListAction, getUserOrderAction } from './reducers/app.reducer';
import MyOrder from './pages/myOrder/MyOrder';

function App() {
  const {cartData,wishListData,user} = useSelector(state=>state.ecommerceReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    // on first time rendering try to get data from local storage and update all the redux state
    const userData = JSON.parse(localStorage.getItem('loggedInUser'))
    if(!_isEmpty(userData)){
      dispatch(addUserDataFromLS(userData))
    }
  }, []);

  useEffect(() => {
    if (!_isEmpty(user?.userId)) {
      // whenever user does the login this will get called to fetch new cart and wishlist data of new user
      dispatch(getCartAndWishListAction(user?.userId));
      localStorage.setItem('loggedInUser',JSON.stringify(user))
    }
  }, [user?.userId]);

  useEffect(() => {
    if (!_isEmpty(user?.userId)) {
      // whenever user does the login this will get called to fetch new cart and wishlist data of new user
      dispatch(getUserOrderAction(user?.userId));
      localStorage.setItem('loggedInUser',JSON.stringify(user))
    }
  }, [user?.userId]);

  return (
    <BrowserRouter>
      <Navbar
          cartData={cartData?.products}
          wishListData={wishListData?.products}
        />
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/wishlist" element={<WishList/>}/>
    <Route path="/my-order" element={<MyOrder/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
