import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FormComp = ({
  isOPen,
  handleOpenModal,
  isName,
  isEmailId,
  isMobileNum,
  isPassword,
  isConfirmPassword,
  modalTitle,
  submitBtnName,
}) => {
  return (
    <div>
      <Modal
        open={isOPen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {modalTitle}
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpenModal(false)}
            />
          </Stack>
          <Stack spacing={2}>
            {isName && (
              <TextField id="outlined-basic" label="Name" variant="outlined" />
            )}
            {isEmailId && (
              <TextField
                id="outlined-basic"
                label="Email Id"
                variant="outlined"
              />
            )}
            {isMobileNum && (
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
              />
            )}
            {isPassword && (
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            )}
            {isConfirmPassword && (
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
              />
            )}
            <Button
              variant="contained"
              sx={{ marginTop: "16px" }}
              color="error"
              onClick={() => handleOpenModal(false)}
            >
              {submitBtnName}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default FormComp;
