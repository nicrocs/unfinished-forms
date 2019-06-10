import styled, { css, keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const loadingRule = css``;

const LoginStyles = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    color: ${props => props.theme.darkgrey};
    font-weight: 700;
  }
  input,
  textarea,
  select {
    width: 100%;
    appearance: none;
    padding: 0.8rem 1.2rem;
    line-height: 1.25;
    font-size: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.4rem;
    border: 0;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.indigo};
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: ${props => props.theme.indigo};
    color: ${props => props.theme.offWhite};
    border: 0;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0.8rem 1.6rem;
    border-radius: 0.4rem;
    :hover {
      background: ${props => props.theme.darkIndigo};
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default LoginStyles;
