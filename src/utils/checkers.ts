import { users } from "../data/data";
import { LoginCreds } from "../types/user";

export const checkUserExist = (values: LoginCreds): false | number => {
  const index = users.findIndex(
    (user) =>
      user.username === values.username && user.password === values.password
  );

  if (index > -1) {
    return index;
  } else {
    return false;
  }
};
