export const validationEmail = (email) => {
  const isCorrecte = email.split("@");
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(email);
  if (!isNaN(isCorrecte[0]) || !isValid) {
    return false;
  }
  return true;
};
