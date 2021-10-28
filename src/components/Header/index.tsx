import React from "react";
import { Link } from "react-router-dom";

import RMBDLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

// styles

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header: React.FC = () => (
  <Wrapper>
    <Content>
      <Link to="/">
        <LogoImg src={RMBDLogo} alt="rmbd-logo" />
      </Link>
      <TMDBLogoImg src={TMDBLogo} alt="" />
    </Content>
  </Wrapper>
);

export default Header;
