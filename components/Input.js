import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const InputStyles = styled.div`
  margin-bottom: 1rem;
  label {
    text-transform: capitalize;
  }
`;
const Input = ({ label, value, ...rest }) => (
  <InputStyles>
    <label htmlFor={label}>{label}</label>
    <input name={label} placeholder={label} value={value} {...rest} />
  </InputStyles>
);
export default Input;
