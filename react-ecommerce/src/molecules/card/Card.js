import {useState} from 'react';
import StarRatings from "react-star-ratings";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

import Card from "@mui/material/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { blueGrey } from '@mui/material/colors';




export default function MyCard({
  item,
  onAddToCart,
  onAddToWishList,
  user,
  isRemoveFromWishList = false,
  onWishListRemove,
  setSelectSize,
  selectSize
}) {
  const [showSizeDialog,setSizeDialog] = useState(false)
  const isLoggedIn = !_isEmpty(user);
  const { name, price, rating, size, image,_id } = item;
  const isSizeSelected = selectSize?.productId === _id;

  const handleAddToCart = (selectedProduct) => () => {
     if(!isSizeSelected) {
      setSizeDialog(true);
      setTimeout(()=>{
        setSizeDialog(false)
      },500)
     return 
     }
     
    onAddToCart(selectedProduct);
  };



  const handleWishList = (selectedProduct) => () => {
    onAddToWishList(selectedProduct);
  };
  const renderName = () => (
    <>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
    </>
  );

  const renderPriceAndWishListAndAddButton = () => (
    <>
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Typography variant="h6" color="text.secondary">
          {`Rs-${price}`}
        </Typography>
        <Stack direction="row">
          <Button
            variant="outlined"
            color="error"
            onClick={handleWishList(item)}
            disabled={!isLoggedIn || isRemoveFromWishList}
          >
            <FavoriteIcon color={isLoggedIn && !isRemoveFromWishList ? "error" : ""}/>
          </Button>
          {isRemoveFromWishList && <Tooltip title="Remove from wishlist">
            <CloseIcon sx={{mt:0.5,cursor:"pointer"}} color="error" onClick={()=>onWishListRemove(_id)}/>
            </Tooltip>}
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart(item)}
          disabled={!isLoggedIn}
        >
          Add To Cart
        </Button>
      </Stack>
    </>
  );

  const renderRating = () => (
    <>
      <div style={{ marginTop: "2px", marginLeft: "2px" }}>
        <StarRatings
          noOfStars="5"
          starRatedColor="orange"
          starDimension="15px"
          rating={rating}
          name="rating"
          starSpacing={0}
        />
      </div>
    </>
  );

  const renderSize = () => (
    <Stack direction="row" spacing={1}>
      <Typography>Size-</Typography>
      {_map(size, (item) => (
        <>
          <Typography size="small" color={isSizeSelected && selectSize?.size===item?"error":blueGrey[500]} sx={{cursor:"pointer"}} onClick={()=>setSelectSize({productId:_id,size:item})}>{item}</Typography>
        </>
      ))}
    </Stack>
  );

  const renderSizeDialog = ()=><Dialog open={showSizeDialog}><DialogTitle>Plese select size.!!</DialogTitle></Dialog>

  return (
    <Card sx={{ minWidth: 380 }}>
      <CardMedia sx={{ height: 380 }} image={image} />
      <CardContent>
        {renderName()}
        {renderPriceAndWishListAndAddButton()}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          {renderRating()}
          {renderSize()}
          {renderSizeDialog()}
        </Stack>
      </CardContent>
    </Card>
  );
}
