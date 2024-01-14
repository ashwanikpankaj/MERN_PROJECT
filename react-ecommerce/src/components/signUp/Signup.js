import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'

import { signup } from "../../reducers/app.reducer";
import FormComp from "../form/FormComp";
import { getFormError } from "./signup.helpers";

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

const Signup = ({ isOpen, handleOpenModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [formError, setFormError] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    mobile: undefined,
  });

  const dispatch = useDispatch();

  const resetFormValue = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    });

    setFormError({
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      mobile: undefined,
    });
  }, []);

  const handleFormDataChange = useCallback(
    (key, value) => {
      const formErrors = getFormError({ ...formData, [key]: value }, formError);
      setFormError(formErrors);
      setFormData((prevState) => ({ ...prevState, [key]: value }));
    },
    [formData, formError]
  );

  const handleSubmitForm = useCallback(() => {
    dispatch(signup(formData));
    resetFormValue();
  }, [dispatch, formData, resetFormValue]);

  return (
      <Modal
        open={isOpen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
           <Box sx={style}>
        <FormComp
        handleOpenModal={handleOpenModal}
          isName
          isEmailId
          isMobileNum
          isPassword
          isConfirmPassword
          modalTitle="SIGN UP"
          submitBtnName="Sign up"
          handleFormDataChange={handleFormDataChange}
          formValue={formData}
          onSubmitForm={handleSubmitForm}
          resetFormValue={resetFormValue}
          formErrorValue={formError}
        />
        </Box>
      </Modal>
    )
};
export default Signup;
