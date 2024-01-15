import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const SuccessFullDialog = ({ isOpenSuccessDialog }) => {
  return <Dialog open={isOpenSuccessDialog}>
    <DialogTitle color="primary">Order Placed Successfully</DialogTitle>
  </Dialog>;
};

export default SuccessFullDialog;
