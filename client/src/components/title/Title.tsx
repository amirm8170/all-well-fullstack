import { childProps } from "../../types/Types";
import "./Title.scss";



const Title = ({ children }: childProps) => {
  return <h1 className="page-title">{ children }</h1>;
};

export default Title;
