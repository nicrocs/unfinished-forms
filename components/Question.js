import React, { useReducer } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Input from "./Input";

const UPDATE_QUESTION_MUTATION = gql`
  mutation UPDATE_QUESTION_MUTATION(
    $id: ID!
    $question: String
    $type: QuestionType
    $description: String
  ) {
    updateQuestion(
      id: $id
      question: $question
      description: $description
      type: $type
    ) {
      id
      question
      description
      type
    }
  }
`;

const possibleTypes = [
  {
    type: "SHORTANSWER",
    display: "Short Answer"
  },
  { type: "PARAGRAPH", display: "Paragraph" },
  { type: "MUTLIPLECHOICE", display: "Multiple Choice" },
  {
    type: "CHECKBOXES",
    display: "Checkboxes"
  }
];

const Question = ({ question, description, type, id }) => {
  const updateQuestion = async (e, updateQuestionMutation) => {
    const { name, value } = e.target;
    const res = await updateQuestionMutation({
      variables: {
        id,
        [name]: value
      }
    });
  };
  return (
    <Mutation mutation={UPDATE_QUESTION_MUTATION}>
      {(updateQuestionMutation, { loading, error }) => {
        return (
          <>
            <div>
              <label htmlFor="questionText">Question</label>
              <input
                id="questionText"
                type="text"
                name="question"
                placeholder="Enter Question text"
                required
                defaultValue={question}
                onBlur={e => updateQuestion(e, updateQuestionMutation)}
              />
            </div>
            <div>
              <label htmlFor="questionDescription">Description</label>
              <textarea
                id="questionDescription"
                name="description"
                placeholder="Enter A Description"
                defaultValue={description}
                onBlur={e => updateQuestion(e, updateQuestionMutation)}
              />
            </div>
            <label htmlFor="questionType">
              Type
              <select
                id="questionType"
                name="type"
                required
                value={type}
                onChange={e => updateQuestion(e, updateQuestionMutation)}
              >
                {possibleTypes.map(type => {
                  return (
                    <option value={type.type} key={type.type}>
                      {type.display}
                    </option>
                  );
                })}
              </select>
            </label>
            {/* if short answer or paragraph show input type */}
            {/* if multiple choice or checkboxes show choices */}
            <h4>Choices</h4>
          </>
        );
      }}
    </Mutation>
  );
};

export default Question;
