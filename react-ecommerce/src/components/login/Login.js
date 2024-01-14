import { useState ,useCallback} from "react";
import {useDispatch} from 'react-redux';

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box'

import FormComp from "../form/FormComp";
import { getFormError } from "../signUp/signup.helpers";
import {login} from "../../reducers/app.reducer";

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

const Login = ({ isOpen, handleOpenModal,handleOpenSignupModal}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: undefined,
    password: undefined,
  });


  const resetFormValue = useCallback(()=>{
    setFormData({
      email: "",
      password: "",
    })
  
    setFormError({
      email: undefined,
      confirmPassword: undefined,
    })
  },[])

  const handleFormDataChange = useCallback((key, value) => {
    const formErrors = getFormError({...formData,[key]:value},formError);
    setFormError(formErrors)
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  }, [formData,formError]);

  const onSubmitForm = useCallback(()=>{
    dispatch(login(formData));
    resetFormValue()
  },[dispatch,formData,resetFormValue])

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => handleOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormComp
        handleOpenModal={handleOpenModal}
        isEmailId
        isPassword
        modalTitle="LOGIN"
        submitBtnName="LOGIN"
        handleFormDataChange={handleFormDataChange}
        onSubmitForm={onSubmitForm}
        formErrorValue={formError}
        formValue={formData}
        resetFormValue={resetFormValue}
      />
      <Button sx={{marginTop:"5px"}} onClick={handleOpenSignupModal}>Click To Signup</Button>
      </Box>
      </Modal>
      </>
  );
};
export default Login;