import styled from "styled-components";

const LinkButton = styled.button`
  color: ${(props) => props.theme.colors.text.gray};
  transition: all 0.2s ease;
  background-color: transparent;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: underline;
  }
`;

export default LinkButton;
