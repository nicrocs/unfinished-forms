import styled from "styled-components";

const Form = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${props => props.background}");
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  .form-body {
    background: ${props => props.theme.offWhite};
    width: 80%;
    margin: 0 auto;
    text-align: left;
    padding: 1rem;
  }
  p {
    margin: 0;
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Form;
