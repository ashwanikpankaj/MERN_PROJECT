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
  formValue,
  handleFormData,
  formErrorValue
}) => {
  const {
    name = "",
    email = "",
    mobile = "",
    password = "",
    confirmPassword = "",
  } = formValue || {};

  const {nameError,emailError,passwordError,confirmPasswordError,mobileError} = formErrorValue || {}

  const handleChange = (event) => {
    const { value, name } = event?.target;
    handleFormData(name, value);
  };

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
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={handleChange}
                name="name"
                value={name}
                error={nameError}
                helperText={nameError && "Please enter valid name"}
              />
            )}
            {isEmailId && (
              <TextField
                id="outlined-basic"
                label="Email Id"
                variant="outlined"
                value={email}
                name="email"
                onChange={handleChange}
                error={emailError}
                helperText={emailError && "Please enter valid email"}
              />
            )}
            {isMobileNum && (
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                type="number"
                value={mobile}
                name="mobile"
                onChange={handleChange}
                error={mobileError}
                helperText={mobileError && "Please enter valid mobile number"}
              />
            )}
            {isPassword && (
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                error={passwordError}
                helperText={passwordError && "Please enter valid password"}
              />
            )}
            {isConfirmPassword && (
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                error={confirmPasswordError}
                helperText={confirmPassword && "Please enter valid password"}
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
