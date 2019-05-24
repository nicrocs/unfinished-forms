import CreateForm from "../components/CreateForm";
import PleaseSignIn from "../components/PleaseSignIn";

const Create = props => {
  return (
    <PleaseSignIn>
      <CreateForm />
    </PleaseSignIn>
  );
};

export default Create;
