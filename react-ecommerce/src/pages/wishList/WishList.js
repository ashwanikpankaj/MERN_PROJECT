import { useCallback } from "react";
import { useSelector ,useDispatch} from "react-redux";
import Stack from "@mui/material/Stack";

import MyCard from "../../molecules/card/Card";
import { addToCart } from "../../reducers/app.reducer";

const WishList = () => {
  const { wishListData,user } = useSelector((state) => state?.ecommerceReducer);
  const dispatch = useDispatch()

  const onAddToCart = useCallback(
    async (selectedProduct) => {
      const payload = { userId: user?.userId, products: [selectedProduct] };
      dispatch(addToCart(payload));
    },
    [dispatch, user?.userId]
  );

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
        <MyCard item={item} isRemoveFromWishList user={user} onAddToCart={onAddToCart}/>
      ))}
    </Stack>
  );
};

export default WishList;
