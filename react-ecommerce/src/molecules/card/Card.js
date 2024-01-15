import * as React from "react";
import StarRatings from "react-star-ratings";
import _map from "lodash/map";

import Card from "@mui/material/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function MyCard({item,onAddToCart,onAddToWishList}) {
  const { name, price, rating, size, image } = item;
  const handleAddToCart = (selectedProduct)=>()=>{
    onAddToCart(selectedProduct)
  }

  const handleWishList = (selectedProduct)=>()=>{
    onAddToWishList(selectedProduct)
  }
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
        <Button variant="outlined" color="error" onClick={handleWishList(item)}>
          <FavoriteIcon color="error" />
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddToCart(item)}>
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
          <Typography size="small">{item}</Typography>
        </>
      ))}
    </Stack>
  );

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
        </Stack>
      </CardContent>
    </Card>
  );
}
