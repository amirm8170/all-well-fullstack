import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useNavigate, } from "react-router-dom";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import { pallet } from "../../layout/pallet";
import "./Home.scss";

const Home = () => {
  const [change, setChange] = useState(false);
  const navigate = useNavigate()

  const logOut = useCallback(() => {
    Cookies.remove('accessToken')
    navigate('/log-out')
  },[navigate])


  return (
    <section className="home-container">
      <div className="home-content">
        <Title>This is your beautiful test app!</Title>
        <Box className="home-box" widthAuto>
          <BoxTitle center={true}>
            This app let’s you change the color of the button below from green
            to red each time you click it! isnt’ that amazing?
          </BoxTitle>
          <Button
            onClick={() => setChange(!change)}
            addClass='mt-3'
            width={350}
            bgColor={change ? pallet.red : pallet.green}>
            Change the color of this button now
          </Button>
        </Box>
        <Button onClick={logOut} addClass="home-btn-logout mt-3" width={105} bgColor={pallet.green}>
            Log-out
        </Button>
      </div>
    </section>
  );
};

export default Home;
