import axios from "axios";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const NewPass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [hide, setHide] = useState(true);
  const [state, setState] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const check = async () => {
      try {
        await Api.get(`/auth/${id}`);
        setValid(true);
        setLoading(false);
      } catch (error) {
        setValid(false);
        setLoading(false);
        navigate('*');
      }
    };
    check();
  }, [id,navigate]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState({...state,[name]:value})
      const err = validation({name , value , state})
      setError({...error , [name]:err})
    },
    [state, error]
  );

  const submitHandler = useCallback( async (e:any) => {
    e.preventDefault()
    setLoading(true)
    if(!state.password.length){
      setError({...error,password:'Password required'})
      setLoading(false)
      return
    }
    if(!state.confirmPassword.length){
      setError({...error,confirmPassword:'Confirm password required'})
      setLoading(false)
      return
    }
    try {
      await axios.put(`http://13.48.28.119:2000/v1/change-password/${id}`,{...state});
      setLoading(false)
      navigate(`/confirm-password/${id}`,{state:{valid:valid}})
    } catch (error:any) {
      console.log(error)
      notif(error.response.data.message, "danger");
      setLoading(false)
    }
  }, [state,navigate,id,valid,error]);

  return (
    <section className="imagePage">
      {loading ? (
        <div className="page-not-found">
          <LoadingIcon width={140} height={140} color={pallet.blue} />
        </div>
      ) : !loading && valid ? (
        <SectionWithImage>
          <form onSubmit={submitHandler} className="imagePage-container">
            <Title>Create new password.</Title>
            <Box>
              <BoxTitle>Create here a new password:</BoxTitle>
              <Input
                name="password"
                value={state.password}
                onChange={changeHandler}
                addClass="mt-1"
                error={error.password}
                type={hide ? "password" : "text"}
                placeholder="Insert new password"
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
              <Input
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={changeHandler}
                addClass="mt-2"
                error={error?.confirmPassword}
                type={hide ? "password" : "text"}
                placeholder="Confirm new password"
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
              disabled={error?.password || error?.confirmPassword || loading }
              addClass="mt-2" width={350} bgColor={pallet.green}>
                Create new password
              </Button>
            </Box>
          </form>
        </SectionWithImage>
      ) : null}
    </section>
  );
};

export default NewPass;
