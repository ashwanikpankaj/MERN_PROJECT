import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PlaceOrder = ({ isVisiblePlaceOrder,onClosePlaceOrderDialog,onPlaceOrder }) => {
  return (
    <Dialog open={isVisiblePlaceOrder}>
      <DialogTitle>Confirm To Place Order</DialogTitle>
      <DialogActions>
       <Button variant="outlined" color="success" onClick={onPlaceOrder}>Confirm</Button>
       <Button variant="outlined" color="error" onClick={onClosePlaceOrderDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceOrder;
