import _isEmpty from 'lodash/isEmpty';

export const getIsFormErrorPresent = (formError) =>{
    let isErrorPresent = false
    for(const key in formError){
       if(!_isEmpty(formError[key])){
        isErrorPresent = true;
        break;
       }
    }
    return isErrorPresent;
}