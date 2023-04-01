import { createContext, useState } from "react";
import { childProps } from "../types/Types";

export const UserContext = createContext({
  setSignedUp: () => null,
  signedUp: null,
  setAuth: () => null,
  auth: null,
} as {
  setSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  signedUp: boolean | null;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  auth: string | null;
});

export const UserProvider = ({ children }: childProps) => {
  const [auth, setAuth] = useState<string>("");
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const value = { auth, signedUp, setAuth, setSignedUp };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
