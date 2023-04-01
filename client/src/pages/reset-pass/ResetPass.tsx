import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Title from "../../components/title/Title";
import LoadingIcon from "../../icon/LoadingIcon";
import { pallet } from "../../layout/pallet";
import Api from "../../services/Api";
import notif from "../../utils/notif";
import validation from "../../utils/validation";
import SectionWithImage from "../components/section-with-image/SectionWithImage";
import "../Style.scss";

const ResetPass = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "" });
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState({ email: value });
      const err = validation({ name, value, state });
      setError({ email: err });
    },
    [state]
  );

  const submitHandler = useCallback(
    async (e: any) => {
      e.preventDefault();
      setLoading(true);
      if (!state.email) {
        setError({ email: "Email required" });
        setLoading(false)
        return
      } else {
        try {
          const res = await Api.post("/email-change-password", { ...state });
          notif(res.data, "success");
          navigate("/login");
          setLoading(false);
        } catch (error: any) {
          notif(error.response.data.message, "danger");
          setLoading(false);
        }
      }
    },
    [state, navigate]
  );

  return (
    <section className="imagePage">
      <SectionWithImage>
        <form onSubmit={submitHandler} className="imagePage-container">
          <Title>Reset your password.</Title>
          <Box>
            <BoxTitle>Have you forgot your password?</BoxTitle>
            <span className="imagePage-top-section-text">
              Do not worry, insert here your email and we will send you a link
              to reset your password.
            </span>
            <Input
              value={state.email}
              onChange={changeHandler}
              name="email"
              placeholder="Email"
              error={error?.email}
              addClass="mt-1"
            />
            <Button
              disabled={error?.email || loading}
              type="submit"
              addClass="mt-2"
              width={350}
              bgColor={pallet.green}
            >
              {loading ? <LoadingIcon width={24} height={24} color={pallet.black}/> : 'Reset your password'}
            </Button>
          </Box>
        </form>
      </SectionWithImage>
    </section>
  );
};

export default ResetPass;
