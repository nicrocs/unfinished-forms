import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import Form from "./styles/LoginStyles";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import Input from "./Input";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ name: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
              <Error error={error} />
              <Input
                type="email"
                label="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
              <Input
                type="password"
                label="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
              <button type="submit">Sign In</button>
              <Link href="/forgot-password">
                <a>Forgot password?</a>
              </Link>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
