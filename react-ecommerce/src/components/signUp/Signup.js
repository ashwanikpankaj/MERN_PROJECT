import FormComp from "../form/FormComp";

const Signup = ({ isSignupModal, handleOpenSignupModal }) => {
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
      />
    </div>
  );
};
export default Signup;
