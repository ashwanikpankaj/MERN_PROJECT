import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { getIsFormErrorPresent } from "./form.helpers";
import { useState } from "react";


const FormComp = ({
  handleOpenModal,
  isName,
  isEmailId,
  isMobileNum,
  isPassword,
  isConfirmPassword,
  modalTitle,
  submitBtnName,
  formValue,
  handleFormDataChange,
  formErrorValue,
  onSubmitForm,
  resetFormValue
}) => {
  const {
    name = "",
    email = "",
    mobile = "",
    password = "",
    confirmPassword = "",
  } = formValue || {};

  const {name:nameError,email:emailError,password:passwordError,confirmPassword:confirmPasswordError,mobile:mobileError} = formErrorValue || {}
  const [fieldError,setFieldError] = useState(false)

  const handleChange = (event) => {
    const { value, name } = event?.target;
    setFieldError(false)
    handleFormDataChange(name, value);
  };

  const handleFormSubmit  = ()=>{
    const isErrorInForm = getIsFormErrorPresent(formErrorValue)
    console.log({isErrorInForm,formErrorValue})
    setFieldError(true)
    if(isErrorInForm) return;
    onSubmitForm()
    handleOpenModal(false)
  }

  const handleClose = ()=>{
    handleOpenModal(false)
    resetFormValue()
    setFieldError(false)
  }

  return (
    <div>
        <Box>
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
              onClick={handleClose}
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
                error={!!nameError && fieldError}
                helperText={(nameError && fieldError) && "Please enter valid name"}
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
                error={!!emailError && fieldError}
                helperText={(emailError && fieldError) && "Please enter valid email"}
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
                error={!!mobileError && fieldError}
                helperText={(mobileError && fieldError) && "Please enter valid mobile number"}
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
                error={!!passwordError && fieldError}
                helperText={(passwordError && fieldError) && "Please enter valid password"}
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
                error={!!confirmPasswordError && fieldError}
                helperText={(confirmPassword && fieldError) && "Please enter valid password"}
              />
            )}
            <Button
              variant="contained"
              sx={{ marginTop: "16px" }}
              color="error"
              onClick={handleFormSubmit}
            >
              {submitBtnName}
            </Button>
          </Stack>
        </Box>
    </div>
  );
};
export default FormComp;
