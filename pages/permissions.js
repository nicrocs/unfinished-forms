import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from "../components/Permissions";
import Page from "../components/Page";

const PermissionsPage = props => {
  return (
    <Page>
      <PleaseSignIn>
        <Permissions />
      </PleaseSignIn>
    </Page>
  );
};

export default PermissionsPage;
