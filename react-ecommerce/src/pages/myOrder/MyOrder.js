import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import MyCard from "../../molecules/card/Card";

const MyOrder = () => {
  const { userOrder } = useSelector((state) => state?.ecommerceReducer);

  return (
    <div style={{width:"100%",height:"90vh",overflow:"auto"}}>
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={2}
      justifyContent="flex-start"
      alignContent="center"
      useFlexGap
      mt={3}
    >
      {userOrder?.myOrder?.products?.map((item) => (
        <MyCard
          item={item}
          isVisibleCartButton={false}
          isVisibleWishlistButton={false}
        />
      ))}
    </Stack>
    </div>
  );
};

export default MyOrder;
