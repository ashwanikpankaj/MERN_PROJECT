import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton'

const CartCard = ({item}) => {
  const {image,name,price}  = item
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
          <Typography>Size:M</Typography>
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
        <IconButton color="primary" size="large">-</IconButton>
        <Typography>5</Typography>
        <IconButton color="primary" size="large">+</IconButton>
      </Stack>
    );
  };

  const totalSection = () => {
    return (
      <Stack direction="row" >
        <Typography style={{marginTop:'5px'}}>{5*price}</Typography>
        <Button>Remove</Button>
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
