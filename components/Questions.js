import React, { useReducer } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/LoginStyles";
import Error from "./ErrorMessage";
import Input from "./Input";
import Question from "./Question";
import { questionsReducer } from "../lib/formReducers";

const ALL_QUESTIONS_IN_FORM_QUERY = gql`
  query ALL_QUESTIONS_IN_FORM_QUERY($formId: ID!) {
    questions(where: { form: { id: $formId } }) {
      id
      question
      description
      type
    }
  }
`;

const CREATE_QUESTION_MUTATION = gql`
  mutation CREATE_QUESTION_MUTATION(
    $question: String!
    $type: QuestionType!
    $description: String
    $formId: ID!
  ) {
    createQuestion(
      question: $question
      description: $description
      type: $type
      form: { connect: { id: $formId } }
    ) {
      id
      question
      description
      type
    }
  }
`;

function CreateQuestion({ formId }) {
  function update(cache, payload) {
    // 1. first read the cache
    const data = cache.readQuery({ query: ALL_QUESTIONS_IN_FORM_QUERY });
    // 2. push new question
    data.questions.push(payload.data.question);
    // 3. write it back to the cache
    cache.writeQuery({ query: ALL_QUESTIONS_IN_FORM_QUERY, data });
  }

  return (
    <Query query={ALL_QUESTIONS_IN_FORM_QUERY} variables={{ formId }}>
      {({ data, loading }) => {
        if (loading) return <p>loading...</p>;
        if (!data.questions) return <p>No Questions found for form {formId}</p>;
        return (
          <Mutation
            mutation={CREATE_QUESTION_MUTATION}
            refetchQueries={[
              { query: ALL_QUESTIONS_IN_FORM_QUERY, variables: { formId } }
            ]}
          >
            {(createQuestion, { loading, error }) => (
              <fieldset>
                <button
                  onClick={async e => {
                    // call the mutation
                    const res = await createQuestion({
                      variables: {
                        formId,
                        question: "Untitled Question?",
                        description: "",
                        type: "SHORTANSWER"
                      }
                    });
                    // add question to form?
                    console.log(res);
                  }}
                >
                  Add Question
                </button>
                {/* questions bar with add new question  */}
                <h3>Questions</h3>
                {data.questions.map((question, index) => {
                  return (
                    <div key={question.id}>
                      <Question {...question} />
                    </div>
                  );
                })}
              </fieldset>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default CreateQuestion;
