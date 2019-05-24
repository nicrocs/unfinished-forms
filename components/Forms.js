import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "./Form";
import Pagination from "./Pagination";
import { perPage } from "../config";

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

const Center = styled.div`
  text-align: center;
`;

const FormsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Forms extends Component {
  render() {
    return (
      <Center>
        <p>Forms</p>
        <Pagination page={this.props.page} />
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
