import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {useSelector} from 'react-redux'

import Home from './pages/home';
import Cart from './pages/cart/Cart';
import Navbar from './components/navbar/Navbar';

function App() {
  const {cartData,wishListData} = useSelector(state=>state.ecommerceReducer)
  return (
    <BrowserRouter>
      <Navbar
          cartData={cartData?.products}
          wishListData={wishListData?.products}
        />
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
