import {useState,useCallback} from 'react';
import FormComp from "../form/FormComp";

const Signup = ({ isSignupModal, handleOpenSignupModal }) => {
  const [formData,setFormData] = useState({name:'',email:'',password:'',confirmPassoword:'',mobile:''})

  const handleFormData = useCallback((key,value)=>{
    console.log({key,value})
    setFormData(prevState=>({...prevState,[key]:value}))
  },[])

  return (
    <div>
      <FormComp
        isOPen={isSignupModal}
        handleOpenModal={handleOpenSignupModal}
        isName
        isEmailId
        isMobileNum
        isPassword
        isConfirmPassword
        modalTitle="SIGN UP"
        submitBtnName="Sign up"
        handleFormData={handleFormData}
        formValue={formData}
      />
    </div>
  );
};
export default Signup;
