import RequestReset from "../components/RequestReset";
import styled from "styled-components";
import Page from "../components/Page";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const ForgotPassword = props => (
  <Page>
    <Columns>
      <RequestReset />
    </Columns>
  </Page>
);

export default ForgotPassword;
