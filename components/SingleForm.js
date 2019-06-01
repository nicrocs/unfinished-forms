import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import Questions from "./Questions";
import { theme } from "../lib/theme";

const SingleFormStyles = styled.div`
  background-color: ${theme.lightIndigo};
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 1200px;
  margin: 0rem auto;
  min-height: 800px;
  padding: 10rem;
  .details {
    padding: 2rem;
    font-size: 2rem;
    background: ${theme.offWhite};
    min-height: 600px;
    h2 {
      color: ${theme.darkgrey};
    }
  }
  .form {
  }
`;

const SINGLE_FORM_QUERY = gql`
  query SINGLE_FORM_QUERY($id: ID!) {
    form(where: { id: $id }) {
      id
      title
      description
      largeImage
      questions {
        question
        type
      }
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
            <SingleFormStyles background={form.largeImage}>
              <Head>
                <title>Forms! | {form.title}</title>
              </Head>
              <form className="details">
                <h2>{form.title}</h2>
                <p>{form.description}</p>
                {form.questions.map(question => {
                  console.log({ question });
                  return (
                    <div key={question.id}>
                      <h3>{question.question}</h3>
                      {question.type === "PARAGRAPH" && <textarea />}
                    </div>
                  );
                })}
              </form>
            </SingleFormStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleForm;
export { SINGLE_FORM_QUERY };
