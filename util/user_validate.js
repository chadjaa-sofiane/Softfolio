export const validateSiginInput = (username, email, gender, password) => {
  const errors = {};
  //firstNAme
  if (!username.trim()) errors.username = "firstname most not be empty !";
  //password
  if (!password.trim()) errors.password = "password most not be empty !";
  //email
  const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{3,9})$/;
  if (!regExp.test(email)) errors.email = "email most be a valid email adresse";
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (userInput, password) => {
  const errors = {};
  if (!userInput) errors.userInput = "userInput most not be empty";
  if (!password.trim()) errors.password = "password most not be empty !";
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
