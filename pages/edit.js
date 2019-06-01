import UpdateForm from "../components/UpdateForm";
import PleaseSignIn from "../components/PleaseSignIn";
import Page from "../components/Page";

const Edit = ({ query }) => {
  return (
    <Page>
      <PleaseSignIn>
        <UpdateForm id={query.id} />
      </PleaseSignIn>
    </Page>
  );
};
export default Edit;
