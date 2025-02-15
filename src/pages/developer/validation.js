import {REGIX} from '../../utils/regix';
import {checkNullOrEmpty, regixValidation} from '../../utils/utils';

export const creatorValidator = (data = {}, validation = {}) => {
  const newObj = {...validation};
  let isValid = true;

  Object.entries(newObj).forEach(entry => {
    const [key, value] = entry;
    let result = creatorValidatInput(data[key], value);
    newObj[key] = {...result};
    if (result?.error) {
      isValid = false;
    }
  });

  return {isValid, validation: newObj};
};

export const creatorValidatInput = (value = '', validation = {}) => {
  let newObj = {...validation};
  let isValid = true;

  if (newObj?.required) {
    const hasError =
      newObj?.type?.toLowerCase() === 'checkbox'
        ? !value
        : checkNullOrEmpty(value);

    newObj.error = hasError;
    newObj.errorMessage = hasError
      ? newObj?.type?.toLowerCase() === 'checkbox'
        ? `Please accept ${newObj?.field?.toLowerCase()}`
        : `Please enter ${newObj?.field?.toLowerCase()}`
      : '';

    if (hasError) {
      isValid = false;
    }
  }

  if (
    !checkNullOrEmpty(newObj?.type) &&
    newObj?.type?.toLowerCase() === 'number' &&
    isValid
  ) {
    const validVal = regixValidation(value, REGIX[newObj?.type?.toLowerCase()]);
    newObj.error = !validVal.isValid;
    isValid = validVal.isValid;
    newObj.errorMessage =
      validVal.msg + ' ' + newObj?.field?.toLowerCase() || '';
  } else if (
    !checkNullOrEmpty(newObj?.type) &&
    newObj?.type?.toLowerCase() !== 'checkbox' &&
    isValid
  ) {
    const validVal = regixValidation(value, REGIX[newObj?.type?.toLowerCase()]);
    newObj.error = !validVal.isValid;
    isValid = validVal.isValid;
    newObj.errorMessage = validVal.msg || '';
  }

  if (!checkNullOrEmpty(newObj?.equalLength) && isValid) {
    const valLength = value?.split('');
    newObj.error = valLength?.length !== newObj?.equalLength;
    isValid = valLength?.length === newObj?.equalLength;
    newObj.errorMessage =
      valLength?.length !== newObj?.equalLength
        ? `Invalid ${newObj?.field?.toLowerCase()}`
        : '';
  }
  if (!checkNullOrEmpty(newObj?.minLength) && isValid) {
    const valLength = value?.split('');
    isValid = valLength?.length >= newObj?.minLength;
    newObj.error = valLength?.length < newObj?.minLength;
    newObj.errorMessage =
      valLength?.length < newObj?.minLength
        ? `Minimum ${newObj?.minLength} character is required`
        : // ? `Invalid ${newObj?.field?.toLowerCase()}`
          '';
  }

  return newObj;
};
