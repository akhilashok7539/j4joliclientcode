/**
 *
 * A validator function to validate any string using character limit
 * @param {String} data Data to be validated
 * @param {Number} minLength Minimum length the string can have
 * @param {Number} maxLength Maximum length the string can have
 * @param {String} fieldName Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validateString = (data, minLength, maxLength, fieldName, isRequired = false) => {
  if (data !== undefined) {
    if (typeof data !== 'string') {
      return { result: false, msg: `${fieldName} must be of type string` };
    } else if (data === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (data === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (data.length < minLength) {
      return { result: false, msg: `${fieldName} should contain at least ${minLength} characters` };
    } else if (data.length > maxLength) {
      return {
        result: false,
        msg: `${fieldName} must not exceed the ${maxLength} character limit`,
      };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * A validator function to validate any number using length
 * @param {Number} data Data to be validated
 * @param {Number} lowerLimit Lower limit the data can have
 * @param {Number} upperLimit Upper limit the data can have
 * @param {String} fieldName Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validateNumber = (data, lowerLimit, upperLimit, fieldName, isRequired = false) => {
  if (data !== undefined) {
    if (typeof data !== 'number') {
      return { result: false, msg: `${fieldName} must be of type number` };
    } else if (data === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (data === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (data < lowerLimit || data > upperLimit) {
      return { result: false, msg: `${fieldName} must be of type number` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * A validator function to validate Email Address
 * @param {String} email Email to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validateEmail = (email, fieldName = 'Email', isRequired = false) => {
  if (email !== undefined) {
    if (typeof email !== 'string') {
      return { result: false, msg: `${fieldName} must be of type string` };
    } else if (email === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (email === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (email.length > 100) {
      return { result: false, msg: `${fieldName} must not exceed the 100 character limit` };
    } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
      return { result: false, msg: `Invalid ${fieldName}` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * A validator function to validate Phone number
 * @param {String | Number} phoneNumber Phone number to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validatePhone = (phoneNumber, fieldName = 'Phone Number', isRequired = false) => {
  if (phoneNumber !== undefined) {
    if (phoneNumber === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (phoneNumber === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      return { result: false, msg: `Invalid ${fieldName}` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * A validator function to validate Password
 * @param {String} password Password to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validatePassword = (password, fieldName = 'Password', isRequired = false) => {
  if (password !== undefined) {
    if (typeof password !== 'string') {
      return { result: false, msg: `${fieldName} must be of type string` };
    } else if (password === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (password.length > 100) {
      return { result: false, msg: `${fieldName} must not exceed the 50 character limit` };
    } else if (password.length < 6) {
      return { result: false, msg: `${fieldName} must contain 6 characters` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * A validator function to validate Pin code
 * @param {String | Number} phoneNumber Pin to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validateZip = (zip, fieldName = 'Pin Number', isRequired = false) => {
  if (zip !== undefined) {
    if (zip === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (zip === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (!/^\d{6}$/.test(zip)) {
      return { result: false, msg: `Invalid ${fieldName}` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};
/**
 *
 * A validator function to validate Date
 * @param {Date} date date to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not.
 */
export const validateDate = (date, fieldName = 'Date', isRequired = false) => {
  if (date !== undefined) {
    if (date === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (date === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return { result: false, msg: `${fieldName} must be of type Date` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};

/**
 *
 * Checks if the date is a valid date of birth
 * @param {Date} dateOfBirth Date of Birth to validate
 * @param {Number} [minimumAge] Minimum age the person should have
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not.
 */
export const validateDateOfBirth = (
  dateOfBirth,
  minimumAge = 1,
  fieldName = 'Date of Birth',
  isRequired = false
) => {
  validateDate(dateOfBirth, fieldName, isRequired);
  const currentDate = new Date();

  const minimumDOB = new Date();
  minimumDOB.setFullYear(currentDate.getFullYear() - minimumAge);

  if (minimumDOB.getTime() < dateOfBirth.getTime()) {
    return { result: false, msg: `The person should be at least ${minimumAge} years old.` };
  } else {
    return { result: true, msg: '' };
  }
};

/**
 *
 * A validator function to validate Name
 * @param {String} name Name to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not.
 */
export const validateName = (name, fieldName = 'Name', isRequired = false) => {
  if (name !== undefined) {
    if (name === '' && !isRequired) {
      return { result: true, msg: '' };
    } else if (name === '') {
      return { result: false, msg: `${fieldName} cannot be empty` };
    } else if (typeof name !== 'string') {
      return { result: false, msg: `${fieldName} must be of type string` };
    } else if (name.length < 3) {
      return { result: false, msg: `${fieldName} should contain at least 3 characters` };
    } else if (name.length > 60) {
      return { result: false, msg: `${fieldName} must not exceed the 60 character limit` };
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {
      return { result: false, msg: `Invalid ${fieldName} (Symbols, Special Characters & Spaces at End not allowed)` };
    } else {
      return { result: true, msg: '' };
    }
  } else if (isRequired) {
    return { result: false, msg: `${fieldName} field cannot be empty` };
  }
  return { result: true, msg: '' };
};
