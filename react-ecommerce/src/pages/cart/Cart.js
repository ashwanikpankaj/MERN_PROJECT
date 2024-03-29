import { useCallback, useMemo, useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import _forEach from "lodash/forEach";
import _isEmpty from 'lodash/isEmpty';

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CartCard from "./components/CartCard";
import Total from "./components/Total";
import Address from "./components/Address";
import PlaceOrder from "./components/PlaceOrder";
import SuccessFullDialog from "./components/SuccessFullDialog";
import { addToCart, cartRemoveAction, decreasItemCartCountAction, placeOrdeAction } from "../../reducers/app.reducer";

const Cart = () => {
  const { cartData,user,userAddress } = useSelector((state) => state.ecommerceReducer);
  const [isVisiblePlaceOrder, setVisiblePlaceOrder] = useState(false);
  const [isOpenSuccessDialog,setOpenSuccessfullDialog] = useState(false);
  const [goToMyOrder,setGoToMyOrder] = useState(false)
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  useEffect(()=>{
    if(_isEmpty(cartData?.products) && !goToMyOrder){
     navigate("/")
    }
   },[cartData,goToMyOrder])

  const totalPrice = useMemo(() => {
    let sum = 0;
    _forEach(cartData?.products, (item) => {
      sum = sum + item?.price * item?.count;
    });
    return sum;
  }, [cartData]);

  const onClosePlaceOrderDialog = useCallback(() => {
    setVisiblePlaceOrder(false);
  }, []);

  const onPlaceOrder = useCallback(() => {
    dispatch(placeOrdeAction({userId:user?.userId,products:cartData?.products}))
    setVisiblePlaceOrder(false);
    setOpenSuccessfullDialog(true);
    setGoToMyOrder(true)
    setTimeout(()=>{
      setOpenSuccessfullDialog(false);
      navigate("/my-order");
    },1000)
  }, [navigate,dispatch,user,cartData]);
  
  const onRemoveFromCart = useCallback((productId)=>{
   dispatch(cartRemoveAction({userId:user?.userId,productId}))
  },[dispatch,user])

  const onDecreaseCartCount = useCallback((productId)=>{
    dispatch(decreasItemCartCountAction({userId:user?.userId,productId}))
   },[dispatch,user])

  const onAddToCart = useCallback((selectedProduct)=>{
    const payload = { userId: user?.userId, products: [selectedProduct] };
    dispatch(addToCart(payload))
  },[dispatch,user])

  const renderHeading = () => {
    return (
      <>
        <Stack justifyContent="space-between" direction="row" spacing={5}>
          <Typography variant="h6" component="h6">
            Item
          </Typography>
          <Typography variant="h6" component="h6">
            Price
          </Typography>
          <Typography variant="h6" component="h6">
            Quantity
          </Typography>
          <Typography variant="h6" component="h6">
            Total
          </Typography>
        </Stack>
        <Divider />
      </>
    );
  };

  const renderCard = () => {
    return cartData?.products?.map((item) => <CartCard item={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} onDecreaseCartCount={onDecreaseCartCount}/>);
  };

  const renderTotalAndAddress = () => {
    return (
      <Stack justifyContent="space-between" direction="row">
        <Address />
        <Total totalPrice={totalPrice} />
      </Stack>
    );
  };

  const renderCheckoutButton = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ minWidth: "400px" }}
          onClick={() => setVisiblePlaceOrder(true)}
          disabled={!userAddress?.address}
        >
          Checkout
        </Button>
      </div>
    );
  };

  const renderPlaceOrder = () => (
    <PlaceOrder
      isVisiblePlaceOrder={isVisiblePlaceOrder}
      onClosePlaceOrderDialog={onClosePlaceOrderDialog}
      onPlaceOrder={onPlaceOrder}
    />
  );

  const renderSuccessFullDialog = ()=><SuccessFullDialog isOpenSuccessDialog={isOpenSuccessDialog}/>


  const heightOfCart = `calc(100vh - 20%)`

  return (
    <Box sx={{ paddingRight: "5px", paddingLeft: "5px",height:heightOfCart}}>
      <div style={{height:"70%",overflow:"auto"}}>
      {renderHeading()}
      {renderCard()}
      </div>
      {renderTotalAndAddress()}
      {renderCheckoutButton()}
      {renderPlaceOrder()}
      {renderSuccessFullDialog()}
    </Box>
  );
};

export default Cart;
