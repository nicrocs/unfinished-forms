import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const SINGLE_FORM_QUERY = gql`
  query SINGLE_FORM_QUERY($id: ID!) {
    form(where: { id: $id }) {
      id
      title
      description
    }
  }
`;
const UPDATE_FORM_MUTATION = gql`
  mutation UPDATE_FORM_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateForm(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

class UpdateForm extends Component {
  state = {};
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateForm = async (e, updateFormMutation) => {
    e.preventDefault();
    const res = await updateFormMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };

  // uploadFile = async e => {
  //   console.log("uploading file...");
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append("file", files[0]);
  //   data.append("upload_preset", "formimages");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/nicholas-guest-jelley/image/upload",
  //     {
  //       method: "POST",
  //       body: data
  //     }
  //   );
  //   const file = await res.json();
  //   console.log(file);
  //   this.setState({
  //     image: file.secure_url,
  //     largeImage: file.eager[0].secure_url
  //   });
  // };
  // check that it's done uploading before allowing submit.
  render() {
    return (
      <Query query={SINGLE_FORM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>loading...</p>;
          if (!data.form) return <p>No Form found for id {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_FORM_MUTATION} variables={this.state}>
              {(updateForm, { loading, error }) => (
                <Form onSubmit={e => this.updateForm(e, updateForm)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.form.title}
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
                        defaultValue={data.form.description}
                        onChange={this.handleChange}
                      />
                    </label>

                    {/* <label htmlFor="questions">
                      Questions
                      {this.state.questions.map(question => {
                        return (
                          <fieldset>
                            <label htmlFor="title">
                              Question Title
                              <input
                                type="text"
                                id="questionTitle"
                                name="quesion_title"
                                placeholder="Title"
                                required
                                value={question.title}
                                onChange={this.handleChange}
                              />
                            </label>
                          </fieldset>
                        );
                      })}
                    </label> */}

                    <button type="submit">
                      Sav{loading ? "ing" : "e"} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateForm;
export { SINGLE_FORM_QUERY, UPDATE_FORM_MUTATION };
