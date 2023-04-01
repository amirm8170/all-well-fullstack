import { btnProps } from "../../types/Types";
import "./Button.scss";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & btnProps
> = ({ width, bgColor, addClass, children, ...props }) => {
  return (
    <button
      className={`btn ${addClass}`}
      style={{ maxWidth: `${width}px`, backgroundColor: `${bgColor}` }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
