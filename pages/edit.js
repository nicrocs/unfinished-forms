import UpdateForm from "../components/UpdateForm";

const Edit = ({ query }) => {
  return <UpdateForm id={query.id} />;
};

export default Edit;
