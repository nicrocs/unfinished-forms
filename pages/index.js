import Forms from "../components/Forms";

const Home = ({ query }) => (
  <div>
    <Forms page={parseFloat(query.page) || 1} />
  </div>
);

export default Home;
