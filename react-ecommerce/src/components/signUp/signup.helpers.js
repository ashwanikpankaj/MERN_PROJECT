import _isEmpty from "lodash/isEmpty";
import {
  validateEmail,
  validateMobileNumber,
} from "../../helpers/validation.helpers";

const VALIDATION_MAP = {
  email: validateEmail,
  mobile: validateMobileNumber,
};

export const getFormError = (formValue, formErrorValue) => {
  for (const key in formValue) {
    if (_isEmpty(formValue[key])) {
      formErrorValue[key] = 'This field is required';
    } else  {
        const validationFunction = VALIDATION_MAP[key];
        formErrorValue[key] = validationFunction ? (validationFunction(formValue[key]) ? undefined : `Please enter valid ${key}`) : undefined;
      }
    }
    return formErrorValue;
  }
