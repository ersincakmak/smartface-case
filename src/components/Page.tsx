import styled from "styled-components";
import Nav from "./Nav";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-inline: 1em;
`;

const Page: React.FC = ({ children }) => {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
};

export default Page;
