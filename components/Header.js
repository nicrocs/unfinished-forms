import Link from "next/link";
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import Nav from "./Nav";
// import Search from "./Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.indigo};
    background: -webkit-linear-gradient(
      135deg,
      ${props => props.theme.offWhite},
      ${props => props.theme.indigo}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: lowercase;
    text-decoration: none;
    position: relative;
    :before {
      content: "";
      border: 1px solid ${props => props.theme.lightgrey};
      padding: 0.5rem 1rem;
      position: absolute;
      width: 100%;
      height: 100%;
      left: -6px;
      top: -2px;
    }
    :after {
      content: "";
      border: 1px solid ${props => props.theme.lightgrey};
      padding: 0.5rem 1rem;
      position: absolute;
      width: 100%;
      height: 100%;
      right: -6px;
      top: 2px;
    }
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

// background-image: linear-gradient(
//   to right,
//   ${props => props.theme.indigo} 0%,
//   ${props => props.theme.lightgrey} 50%,
//   ${props => props.theme.indigo} 100%
// );

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.lightIndigo};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Unfinished Forms</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    {/* <div className="sub-bar">
      <Search />
    </div> */}
  </StyledHeader>
);

export default Header;
