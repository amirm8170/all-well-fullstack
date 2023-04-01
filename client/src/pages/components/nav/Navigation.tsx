import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import LogoIcon from "../../../icon/LogoIcon";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav-container">
        <Link to="/" className="logo-container">
          <LogoIcon width={148.65} height={48} />
        </Link>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
