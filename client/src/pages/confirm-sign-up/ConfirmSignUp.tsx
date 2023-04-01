import { useNavigate } from "react-router-dom";
import BoxTitle from "../../components/box-title/BoxTitle";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
import { pallet } from "../../layout/pallet";
import SectionWithImage from "../components/section-with-image/SectionWithImage";
import "../Style.scss";

const ConfirmSignUp = () => {
  const navigate = useNavigate()
  
  return (
    <section className="imagePage">
      <SectionWithImage>
        <div
          className="imagePage-container mt-4"
          style={{ alignItems: "center" }}
        >
          <Box widthAuto>
            <BoxTitle center={true}>
              Congrats! you have successfully signed-up!
            </BoxTitle>
          </Box>
          <Button onClick={()=>navigate("/login")} addClass="mt-7" width={350} bgColor={pallet.green}>
            Click here to log-in into your app!
          </Button>
        </div>
      </SectionWithImage>
    </section>
  );
};

export default ConfirmSignUp;
