import CreateForm from "../components/CreateForm";
import PleaseSignIn from "../components/PleaseSignIn";
import Page from "../components/Page";

const Create = props => {
  return (
    <Page>
      <PleaseSignIn>
        <CreateForm />
      </PleaseSignIn>
    </Page>
  );
};

export default Create;
