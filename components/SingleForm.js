import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";

const SingleFormStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_FORM_QUERY = gql`
  query SINGLE_FORM_QUERY($id: ID!) {
    form(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;
class SingleForm extends Component {
  render() {
    return (
      <Query
        query={SINGLE_FORM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.form) return <p>No Item Found for {this.props.id}</p>;
          const form = data.form;
          return (
            <SingleFormStyles>
              <Head>
                <title>Forms! | {form.title}</title>
              </Head>
              <img src={form.largeImage} alt={form.title} />
              <div className="details">
                <h2>Viewing {form.title}</h2>
                <p>{form.description}</p>
              </div>
            </SingleFormStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleForm;
export { SINGLE_FORM_QUERY };
