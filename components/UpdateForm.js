import React, { useReducer } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/LoginStyles";
import Error from "./ErrorMessage";
import FormInputs from "./FormInputs";
import { formReducer } from "../lib/formReducers";

const SINGLE_FORM_QUERY = gql`
  query SINGLE_FORM_QUERY($id: ID!) {
    form(where: { id: $id }) {
      id
      title
      description
      questions {
        id
        question
        description
        type
      }
    }
  }
`;
const UPDATE_FORM_MUTATION = gql`
  mutation UPDATE_FORM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $image: String
    $largeImage: String
    $questions: [QuestionCreateWithoutFormInput]
  ) {
    updateForm(
      id: $id
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      questions: $questions
    ) {
      id
      title
      description
      image
      largeImage
      questions {
        id
        question
        type
        description
      }
    }
  }
`;

function UpdateForm({ id }) {
  const updateForm = async (updateFormMutation, form) => {
    const res = await updateFormMutation({
      variables: {
        id,
        ...form
      }
    });
  };

  return (
    <Query query={SINGLE_FORM_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return <p>loading...</p>;
        if (!data.form) return <p>No Form found for id {id}</p>;
        return (
          <Mutation mutation={UPDATE_FORM_MUTATION}>
            {(updateFormMutation, { loading, error }) => (
              <FormInputs
                error={error}
                loading={loading}
                formData={data.form}
                updateData={data => updateForm(updateFormMutation, data)}
                formId={id}
              />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default UpdateForm;
export { SINGLE_FORM_QUERY, UPDATE_FORM_MUTATION };
