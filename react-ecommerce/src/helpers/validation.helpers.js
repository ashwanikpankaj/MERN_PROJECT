export const validateMobileNumber = (num)=>{
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(num);
}

export const  validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  }