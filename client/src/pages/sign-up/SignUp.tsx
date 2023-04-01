import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Title from "../../components/title/Title";
import HidePasswordIcon from "../../icon/HidePasswordIcon";
import LoadingIcon from "../../icon/LoadingIcon";
import ShowPasswordIcon from "../../icon/ShowPasswordIcon";
import { pallet } from "../../layout/pallet";
import Api from "../../services/Api";
import notif from "../../utils/notif";
import validation from "../../utils/validation";
import SectionWithImage from "../components/section-with-image/SectionWithImage";
import "../Style.scss";

const SignUp = () => {

  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState<any>({});
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const ChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
      const err = validation({ name, value, state });
      setError({ ...error, [name]: err });
    },
    [state, error]
  );

  const submitHandler = useCallback(
    async (e: any) => {
      e.preventDefault();
      setLoading(true);
      if(!state.email.length){
        setError({email:'Email required'})
        setLoading(false)
        return
      }
      if(!state.password.length){
        setError({...error,password:'Password required'})
        setLoading(false)
        return
      }
      try {
        await Api.post("/signup", { ...state });
        navigate("/confirm-sign-up");
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        notif(error.response.data.message, "danger");
      }
    },
    [state, navigate,error]
  );

  return (
    <section className="imagePage">
      <SectionWithImage>
        <form onSubmit={submitHandler} className="imagePage-container">
          <Title>Sign-up to your test app.</Title>
          <Box>
            <BoxTitle>Chose a user-id and a password</BoxTitle>
            <Input
              onChange={ChangeHandler}
              name="email"
              value={state.email}
              placeholder="Email"
              error={error?.email !== undefined && error?.email}
              addClass="mt-1"
            />
            <Input
              onChange={ChangeHandler}
              value={state.password}
              name="password"
              addClass="mt-2"
              error={error?.password !== undefined && error?.password}
              type={hide ? "password" : "text"}
              placeholder="chose a password"
              rightIcon={
                hide ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setHide(false)}
                  >
                    <HidePasswordIcon
                      width={34}
                      height={34}
                      color={pallet.iconColor}
                    />
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setHide(true)}
                  >
                    <ShowPasswordIcon
                      width={34}
                      height={34}
                      color={pallet.iconColor}
                    />
                  </span>
                )
              }
            />
            <Button
              disabled={
                error?.email ||
                error?.password ||
                loading
              }
              type="submit"
              addClass="mt-3"
              width={350}
              bgColor={pallet.green}
            >
              {loading ? (
                <LoadingIcon width={24} height={24} color={pallet.black} />
              ) : (
                "Sign-up!"
              )}
            </Button>
          </Box>
        </form>
      </SectionWithImage>
    </section>
  );
};

export default SignUp;
