import styled from "styled-components";

const Title = styled.h3`
  margin: 0;
  margin-bottom: 1rem;
  a {
    display: inline;
    line-height: 1.3;
    font-size: 2.4rem;
    color: ${props => props.theme.darkgrey};
  }
`;

export default Title;
