import Signin from "../components/Signin";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";
import Page from "../components/Page";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SigninPage = props => (
  <Page>
    <Columns>
      <Signin />
    </Columns>
  </Page>
);

export default SigninPage;
