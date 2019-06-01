import React, { useReducer } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/LoginStyles";
import { formReducer } from "../lib/formReducers";
import FormInputs from "./FormInputs";

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

function CreateForm() {
  return (
    <Mutation mutation={CREATE_FORM_MUTATION}>
      {(createForm, { loading, error }) => (
        <FormInputs
          error={error}
          loading={loading}
          submitData={async (e, form) => {
            // Stop the form from submitting
            e.preventDefault();
            // call the mutation
            const res = await createForm({
              variables: form
            });
            // change them to the single item page
            console.log(res);
            Router.push({
              pathname: "/form",
              query: { id: res.data.createForm.id }
            });
          }}
        />
      )}
    </Mutation>
  );
}

export default CreateForm;
export { CREATE_FORM_MUTATION };
