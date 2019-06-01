import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import Form from "./Form";
import Pagination from "./Pagination";
import { perPage } from "../config";
import Error from "./ErrorMessage";

const ALL_FORMS_QUERY = gql`
  query ALL_FORMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    forms(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      largeImage
    }
  }
`;

const CREATE_FORM_MUTATION = gql`
  mutation CREATE_FORM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $questions: [QuestionCreateWithoutFormInput]
  ) {
    createForm(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      questions: $questions
    ) {
      id
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const FormsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Forms extends Component {
  render() {
    return (
      <Center>
        <Query
          query={ALL_FORMS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <FormsList>
                {data.forms.map(form => (
                  <Form form={form} key={form.id} />
                ))}
                <Mutation mutation={CREATE_FORM_MUTATION}>
                  {(createForm, { loading, error }) => (
                    <div
                      onClick={async e => {
                        // Stop the form from submitting
                        e.preventDefault();
                        // call the mutation
                        const res = await createForm({
                          variables: {
                            title: "Untitled Form",
                            description: "Untitled Form Description"
                          }
                        });
                        // change them to the single item page
                        console.log(res);
                        Router.push({
                          pathname: "/edit",
                          query: { id: res.data.createForm.id }
                        });
                      }}
                    >
                      <Error error={error} />
                      Create Form
                    </div>
                  )}
                </Mutation>
              </FormsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Forms;
export { ALL_FORMS_QUERY };
