import Forms from "../components/Forms";
import Page from "../components/Page";
const Home = ({ query }) => (
  <Page>
    <Forms page={parseFloat(query.page) || 1} />
  </Page>
);

export default Home;
