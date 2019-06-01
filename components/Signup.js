import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import LoginStyles from "./styles/LoginStyles";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import Input from "./Input";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <LoginStyles
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ name: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up</h2>
              <Error error={error} />
              <Input
                type="email"
                label="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
              <Input
                type="text"
                label="name"
                value={this.state.name}
                onChange={this.saveToState}
              />
              <Input
                type="password"
                label="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
              <button type="submit">Sign Up</button>
            </fieldset>
          </LoginStyles>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
