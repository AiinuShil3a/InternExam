const dayjs = require('dayjs');

exports.validateEmail = (email) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (email.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

exports.validatePassword = (password) => {
  /** 
   * check password complexity
   * 
   * conditions
   * - must have 8-16 character
   * - must have at least 1 capital letter | ABC
   * - must have at least 1 numerical character | 123
   * 
   */
  let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/g;
  return passwordRegex.test(password.trim());
}

exports.validateHasNoEmojis = (inputString) => {
  // Define a regular expression to match emojis
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAB0}-\u{1FABF}\u{1FAC0}-\u{1FAFF}\u{1FAD0}-\u{1FAFF}\u{1FAE0}-\u{1FAFF}\u{1FAF0}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F6A0}-\u{1F6FF}\u{1F710}-\u{1F773}\u{1F780}-\u{1F7D8}\u{1F7E0}-\u{1F7EB}\u{1F7F0}-\u{1F7FF}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F8B0}-\u{1F8FF}\u{1F900}-\u{1F9B6}\u{1F9C0}-\u{1F9FF}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA74}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA86}\u{1FA90}-\u{1FAA8}\u{1FAB0}-\u{1FAB6}\u{1FAC0}-\u{1FAC2}\u{1FAD0}-\u{1FAD6}\u{1FAE0}-\u{1FAE7}\u{1FAF0}-\u{1FAF6}\u{1FA60}-\u{1FA6D}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAB0}-\u{1FABF}\u{1FAC0}-\u{1FAFF}\u{1FAD0}-\u{1FAFF}\u{1FAE0}-\u{1FAFF}\u{1FAF0}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F6A0}-\u{1F6FF}\u{1F710}-\u{1F773}\u{1F780}-\u{1F7D8}\u{1F7E0}-\u{1F7EB}\u{1F7F0}-\u{1F7FF}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F8B0}-\u{1F8FF}\u{1F900}-\u{1F9B6}\u{1F9C0}-\u{1F9FF}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA74}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA86}\u{1FA90}-\u{1FAA8}\u{1FAB0}-\u{1FAB6}\u{1FAC0}-\u{1FAC2}\u{1FAD0}-\u{1FAD6}\u{1FAE0}-\u{1FAE7}\u{1FAF0}-\u{1FAF6}]/gu;

  return !emojiRegex.test(inputString);
}

exports.validateNotSpecialCharacter = (inputString) => {
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return !specialCharacterRegex.test(inputString);
}

exports.validatePassportId = (inputString) => {
  const passportIdRegex = /^[\w\d]{3,13}$/;
  return passportIdRegex.test(inputString);
}

exports.validateDateOfBirth = (inputDate) => {
  // dob after 1900 and before current date
  const dateOfBirth = dayjs(inputDate);
  const currentDate = dayjs();
  return dateOfBirth.isAfter(dayjs('1900-01-01')) && dateOfBirth.isBefore(currentDate);
}
exports.validateNationalityCode = (nationalityCode) => {
  return nationalityCode.match(/^[A-Z]{3}$/);
}