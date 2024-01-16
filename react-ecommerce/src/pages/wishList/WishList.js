import { useCallback,useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import Stack from "@mui/material/Stack";

import MyCard from "../../molecules/card/Card";
import { addToCart, wishListRemoveAction } from "../../reducers/app.reducer";

const WishList = () => {
  const { wishListData,user } = useSelector((state) => state?.ecommerceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('called',wishListData)
    if(_isEmpty(wishListData?.products)){
      navigate("/")
    }
  },[wishListData])

  const onAddToCart = useCallback(
    async (selectedProduct) => {
      const payload = { userId: user?.userId, products: [selectedProduct] };
      dispatch(addToCart(payload));
    },
    [dispatch, user?.userId]
  );

  const onWishListRemove = useCallback((productId)=>{
    dispatch(wishListRemoveAction({userId:user?.userId,productId}))
  },[dispatch,user]);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={2}
      justifyContent="flex-start"
      alignContent="center"
      useFlexGap
      mt={3}
    >
      {wishListData?.products?.map((item) => (
        <MyCard item={item} isRemoveFromWishList user={user} onAddToCart={onAddToCart} onWishListRemove={onWishListRemove}/>
      ))}
    </Stack>
  );
};

export default WishList;
