import ImageIcon from "../../../icon/ImageIcon";
import { childProps } from "../../../types/Types";
import "./SectionWithImage.scss";

const SectionWithImage = ({ children }: childProps) => {
  return (
    <div className="bg-container">
      <div className="bg-container-image">
        <span className="bg-image">
          <ImageIcon width={'100%'} height={'100%'} />
        </span> 
      </div>
      <div className="bg-child-container">{children}</div>
    </div>
  );
};

export default SectionWithImage;
