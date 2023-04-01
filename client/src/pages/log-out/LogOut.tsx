import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import { pallet } from "../../layout/pallet";
import "./LogOut.scss";

const LogOut = () => {
  const navigate = useNavigate()
  
  return (
    <section className="log-out-container">
      <div className="log-out-content">
        <Title>You logged out!</Title>
        <Button onClick={()=> navigate('/login')} width={350} bgColor={pallet.green}>
          Click here to Access your app again!
        </Button>
      </div>
    </section>
  );
};

export default LogOut;
