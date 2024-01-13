import FormComp from "../form/FormComp";

const Login = ({ isSignupModal, handleOpenSignupModal }) => {
  return (
    <div>
      <FormComp
        isOPen={isSignupModal}
        handleOpenModal={handleOpenSignupModal}
        isEmailId
        isPassword
        modalTitle="LOGIN"
        submitBtnName="LOGIN"
      />
    </div>
  );
};
export default Login;