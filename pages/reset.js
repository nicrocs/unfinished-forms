import Reset from "../components/Reset";
import Page from "../components/Page";

const ResetPage = ({ query }) => (
  <Page>
    <p>Reset Your Password</p>
    <Reset resetToken={query.resetToken} />
  </Page>
);

export default ResetPage;
