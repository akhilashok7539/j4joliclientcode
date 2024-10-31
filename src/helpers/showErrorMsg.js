import {
  validateString,
  validatePhone,
  validateEmail,
  validateZip,
  validatePassword,
  validateName,
  validateDateOfBirth,
  validateDate,
} from './validate';
/**
 *
 * @param {Sting} eventName event name
 * @param {String} value value
 * @param {Function} setErrorMessage setState function to update error message
 */
export const showErrorMsg = (eventName, value, setErrorMessage) => {
  let result;
  let formValidity = true;
  if (eventName === 'name') {
    result = validateName(value, 'Name', true);
  } else if (eventName === 'phoneNumber') {
    result = validatePhone(value, 'Mobile Number', true);
  } else if (eventName === 'whatsAppNumber') {
    result = validatePhone(value, 'Whatsapp Number', false);
  } else if (eventName === 'email') {
    result = validateEmail(value, 'Email', false);
  } else if (eventName === 'companyName') {
    result = validateString(value, 3, 120, 'Company Name', true);
  } else if (eventName === 'city') {
    result = validateString(value, 3, 30, 'City and District', true);
  } else if (eventName === 'state') {
    result = validateString(value, 3, 30, 'State', true);
  } else if (eventName === 'zip') {
    result = validateZip(value, 'Pin Code', true);
  } else if (eventName === 'designation') {
    result = validateString(value, 3, 30, 'Designation', true);
  } else if (eventName === 'password') {
    result = validatePassword(value, 'Password', true);
  } else if (eventName === 'dob') {
    if (value === '') result = { result: false, msg: 'Date cannot be empty' };
    else result = validateDateOfBirth(new Date(value), 18, 'date_of_birth', true);
  } else if (eventName === 'educational_qualification') {
    if (value === '') result = { result: false, msg: 'This field cannot be empty' };
    else result = { result: true, msg: '' };
  } else if (eventName === 'gender') {
    if (value === 'null') result = { result: false, msg: 'Please Select a gender' };
    else result = { result: true, msg: '' };
  } else if (eventName === 'experience') {
    result = validateString(value, 3, 150, 'Experience');
  } else if (eventName === 'languages_known') {
    result = validateString(value, 3, 60, 'Languages known');
  } else if (eventName === 'computer_knowledge') {
    result = validateString(value, 3, 60, 'Computer Knowledge');
  } else if (eventName === 'tele_caller_id') {
    result = validateString(value, 3, 30, 'Tele Caller ID', true);
  } else if (eventName === 'title') {
    result = validateString(value, 3, 60, 'Title', true);
  } else if (eventName === 'salary') {
    result = validateString(value, 3, 30, 'Salary', true);
  } else if (eventName === 'district') {
    result = validateString(value, 3, 30, 'District', true);
  } else if (eventName === 'location') {
    result = validateString(value, 3, 60, 'Location', true);
  } else if (eventName === 'description') {
    result = validateString(value, 3, 300, 'Description', true);
  } else if (eventName === 'job_category') {
    if (value === '') result = { result: false, msg: 'Job category cannot be empty' };
    else result = { result: true, msg: '' };
  } else if (eventName === 'working_time') {
    result = validateString(value, 3, 100, 'Working time', true);
  } else if (eventName === 'experience_required') {
    result = validateString(value, 3, 200, 'Experience Required', true);
  } else if (eventName === 'number_of_vacancies') {
    if (value === '') result = { result: false, msg: 'Number of vacancies cannot be empty' };
    else result = { result: true, msg: '' };
  } else if (eventName === 'oldPassword') {
    result = validatePassword(value, 'Password', true);
  } else if (eventName === 'newPassword') {
    result = validatePassword(value, 'Password', true);
  } else if (eventName === 'username') {
    result = validateString(value, 3, 30, 'user Name', true);
  } else if (eventName === 'toDate') {
    result = validateDate(value, 'To Date', true);
  } else if (eventName === 'fromDate') {
    result = validateDate(value, 'From Date', true);
  } else if (eventName === 'paidDate') {
    result = validateDate(value, 'Paid Date', true);
  } else if (eventName === 'address') {
    result = validateString(value, 3, 120, 'Address', true);
  } else if (eventName === 'address_line_1') {
    result = validateString(value, 3, 120, 'Address Line 1', true);
  } else if (eventName === 'address_line_2') {
    result = validateString(value, 3, 120, 'Address Line 2', true);
  } else if (eventName === 'reference') {
    if (value === '') result = { result: false, msg: 'This field cannot be empty' };
    else result = { result: true, msg: '' };
  } else if (eventName === 'telecallerName') {
    result = validateName(value, 'Telecaller Name', true);
  } else if (eventName === 'jobSource') {
    result = validateString(value, 3, 50, 'Job Source', true);
  } else {
    result = { result: true, msg: '' };
  }

  if (!result.result) {
    formValidity = false;
    setErrorMessage((prevErrorMessage) => {
      return {
        ...prevErrorMessage,
        [eventName]: result.msg,
      };
    });
  } else {
    setErrorMessage((prevErrorMessage) => {
      return {
        ...prevErrorMessage,
        [eventName]: '',
      };
    });
  }
  return formValidity;
};
