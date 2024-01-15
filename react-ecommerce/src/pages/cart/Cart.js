import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import _forEach from "lodash/forEach";

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

const Cart = () => {
  const { cartData } = useSelector((state) => state.ecommerceReducer);
  const [isVisiblePlaceOrder, setVisiblePlaceOrder] = useState(false);
  const [isOpenSuccessDialog,setOpenSuccessfullDialog] = useState(false);
  const navigate = useNavigate()

  const totalPrice = useMemo(() => {
    let sum = 0;
    _forEach(cartData?.products, (item) => {
      sum = sum + item?.price;
    });
    return sum;
  }, [cartData]);

  const onClosePlaceOrderDialog = useCallback(() => {
    setVisiblePlaceOrder(false);
  }, []);

  const onPlaceOrder = useCallback(() => {
    setVisiblePlaceOrder(false);
    setOpenSuccessfullDialog(true)
    setTimeout(()=>{
      setOpenSuccessfullDialog(false);
      navigate("/")
    },1000)
  }, [navigate]);

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
    return cartData?.products?.map((item) => <CartCard item={item} />);
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

  return (
    <Box sx={{ paddingRight: "5px", paddingLeft: "5px" }}>
      {renderHeading()}
      {renderCard()}
      {renderTotalAndAddress()}
      {renderCheckoutButton()}
      {renderPlaceOrder()}
      {renderSuccessFullDialog()}
    </Box>
  );
};

export default Cart;
