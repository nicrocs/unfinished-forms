import SingleForm from "../components/SingleForm";

const Form = ({ query }) => (
  <div>
    <SingleForm id={query.id} />
  </div>
);

export default Form;
