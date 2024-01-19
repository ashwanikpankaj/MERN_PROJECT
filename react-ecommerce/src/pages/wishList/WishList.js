import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";

import Stack from "@mui/material/Stack";

import MyCard from "../../molecules/card/Card";
import { addToCart, wishListRemoveAction } from "../../reducers/app.reducer";
import { getIsPresent } from "../../helpers/common.helpers";

const WishList = () => {
  const { wishListData, user,cartData } = useSelector(
    (state) => state?.ecommerceReducer
  );
  const [selectSize, setSelectSize] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called", wishListData);
    if (_isEmpty(wishListData?.products)) {
      navigate("/");
    }
  }, [wishListData]);

  const onAddToCart = useCallback(
    async (selectedProduct) => {
      const payload = { userId: user?.userId, products: [{...selectedProduct,size:[selectSize?.size]}] };
      dispatch(addToCart(payload));
    },
    [dispatch, user?.userId,selectSize]
  );

  const onWishListRemove = useCallback(
    (productId) => {
      dispatch(wishListRemoveAction({ userId: user?.userId, productId }));
    },
    [dispatch, user]
  );

  return (
    <div style={{width:"100%",height:"90%",overflow:"auto"}}>
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
        <MyCard
          item={item}
          isRemoveFromWishList
          user={user}
          onAddToCart={onAddToCart}
          onWishListRemove={onWishListRemove}
          setSelectSize={setSelectSize}
          selectSize={selectSize}
          isPresentInCart ={ getIsPresent(item,cartData?.products)}
        />
      ))}
    </Stack>
    </div>
  );
};

export default WishList;
