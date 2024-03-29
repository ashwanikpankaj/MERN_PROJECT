import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton'

const CartCard = ({item,onRemoveFromCart,onAddToCart,onDecreaseCartCount}) => {
  const {image,name,price,count,_id,size}  = item
  const renderItemSection = () => {
    return (
     <Stack direction="row" justifyContent="center" alignItems="center">
      <div>
        <img
          src={image}
          style={{ width: "70px", height: "70px" }}
          alt="img"
        />
        <Stack>
          <Typography>{name}</Typography>
          <Typography>Size:{size?.[0]}</Typography>
        </Stack>
        </div>
        </Stack>
    );
  };

  const renderPriceSection = () => {
    return <Typography>Rs{price}</Typography>;
  };

  const renderQuantitySection = () => {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IconButton color="primary" size="large" onClick={()=>onDecreaseCartCount(_id)}>-</IconButton>
        <Typography>{count}</Typography>
        <IconButton color="primary" size="large" onClick={()=>onAddToCart(item)}>+</IconButton>
      </Stack>
    );
  };

  const totalSection = () => {
    return (
      <Stack direction="row" >
        <Typography style={{marginTop:'5px'}}>{count*price}</Typography>
        <Button onClick={()=>onRemoveFromCart(_id)}>Remove</Button>
      </Stack>
    );
  };

  return <>
   <Stack direction="row" justifyContent="space-between" alignItems="center">
    {renderItemSection()}
    {renderPriceSection()}
    {renderQuantitySection()}
    {totalSection()}
    </Stack>
    <Divider/>
  </>
 
};

export default CartCard;
