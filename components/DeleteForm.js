import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_FORMS_QUERY } from "./Forms";

const DELETE_FORM_MUTATION = gql`
  mutation DELETE_FORM_MUTATION($id: ID!) {
    deleteForm(id: $id) {
      id
    }
  }
`;

class DeleteForm extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_FORMS_QUERY });
    // 2. Filter the deleted itemout of the page
    data.forms = data.forms.filter(
      form => form.id !== payload.data.deleteForm.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_FORMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_FORM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteForm, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this form?")) {
                deleteForm().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteForm;
