import { useCallback, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./pages/components/nav/Navigation";
import ConfirmPassword from "./pages/confirm-password/ConfirmPassword";
import ConfirmSignUp from "./pages/confirm-sign-up/ConfirmSignUp";
import Home from "./pages/home/Home";
import LogOut from "./pages/log-out/LogOut";
import LogIn from "./pages/login/LogIn";
import NewPass from "./pages/new-pass/NewPass";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import ResetPass from "./pages/reset-pass/ResetPass";
import SignUp from "./pages/sign-up/SignUp";
import Cookies from "js-cookie";
import Api from "./services/Api";
import { UserContext } from "./context/userContext";

const Router = () => {
  const {auth} = useContext(UserContext)
  const token = Cookies.get("accessToken");


  useEffect(() => {
    const data = async () => {
      try {
        await Api.get("/auth");
      } catch (error) {
        Cookies.remove('accessToken')
      }
    };
    data();
  }, [token , auth]);

  const BeforeLogin = useCallback(
    ({ redirectPath = "/login", children }: any) => {
      if (!token) {
        return <Navigate to={redirectPath} replace />;
      }
      return children;
    },
    [token]
  );

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<BeforeLogin><Home /></BeforeLogin>}/>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/confirm-password/:id" element={<ConfirmPassword />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/new-password/:id" element={<NewPass />} />
        <Route path="/log-out" element={<LogOut />}/>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
