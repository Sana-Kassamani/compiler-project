export const validateForm = (form) => {
  for (let i in form) {
    if (!i) {
      console.log("empty credentials");
      return false;
    }
  }
  return true;
};
