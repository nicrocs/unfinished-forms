import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CREATE_FORM_MUTATION = gql`
  mutation CREATE_FORM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createForm(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateForm extends Component {
  state = {
    title: "Untitled",
    description: "Form description",
    image: "",
    largeImage: "",
    questions: [
      {
        title: "Untitled Question",
        type: "single_choice",
        choices: [
          {
            label: "Option 1",
            id: 0
          }
        ]
      }
    ]
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionChange = e => {
    const { name, type, value } = e.target;
    this.setState({ questions: [{ [name]: value }] });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "formimages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/nicholas-guest-jelley/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_FORM_MUTATION} variables={this.state}>
        {(createForm, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createForm();
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: "/form",
                query: { id: res.data.createForm.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              {/* questions bar with add new question  */}
              <h3>Questions</h3>

              {this.state.questions.map(question => {
                return (
                  <fieldset>
                    <label htmlFor="question">
                      Question
                      <input
                        type="text"
                        id="question"
                        name="question"
                        placeholder="Question"
                        required
                        value={question.question}
                        onChange={this.handleQuestionChange}
                      />
                    </label>
                    <label htmlFor="questionDescription">
                      Description
                      <textarea
                        id="questionDescription"
                        name="description"
                        placeholder="Enter A Description"
                        value={question.description}
                        onChange={this.handleQuestionChange}
                      />
                    </label>
                    <label htmlFor="questionType">
                      Type
                      <select
                        id="questionType"
                        name="type"
                        required
                        value={question.type}
                      >
                        <option value="short_answer">Short Answer</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="checkboxes">Checkboxes</option>
                      </select>
                    </label>
                    {/* if short answer or paragraph show input type */}
                    {/* if multiple choice or checkboxes show choices */}
                    <h4>Choices</h4>
                  </fieldset>
                );
              })}
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateForm;
export { CREATE_FORM_MUTATION };
