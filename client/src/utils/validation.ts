import { validationProps } from "../types/Types";

const validation = ({ name, value, state }: validationProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  switch (name) {
    case "email": {
      if (!value) {
        return "Email required";
      } else if (!emailRegex.test(value)) {
        return "Invalid email address";
      }
      break;
    }
    case "password": {
        if (!value) {
          return "Password required";
        }
      }
      break;
    case "confirmPassword" : {
        if (!value) {
          return "Confirm password required";
        }
        else if (value !== state.password) {
          return "Password not match";
        }
      }
      break;
  }
};

export default validation;
