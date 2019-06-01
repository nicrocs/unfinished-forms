import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import FormStyles from "./styles/FormStyles";
import DeleteForm from "./DeleteForm";

class Form extends Component {
  static propTypes = {
    form: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    }).isRequired
  };
  render() {
    const { title, description, id, image } = this.props.form;
    return (
      <FormStyles background={image}>
        <div className="form-body">
          <Title>
            <Link
              href={{
                pathname: "/form",
                query: { id }
              }}
            >
              <a>{title}</a>
            </Link>
          </Title>
          <p>{description}</p>
        </div>
        <div className="buttonList">
          <Link
            href={{
              pathname: "edit",
              query: { id }
            }}
          >
            <a>Edit</a>
          </Link>
          <DeleteForm id={id}>Delete</DeleteForm>
        </div>
      </FormStyles>
    );
  }
}

Form.propTypes = {
  form: PropTypes.object.isRequired
};

export default Form;
