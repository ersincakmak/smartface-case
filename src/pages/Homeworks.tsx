import styled from "styled-components";
import Page from "../components/Page";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow: hidden;
  width: min(75rem, 100%); // 1200px
  margin-inline: auto;
  padding: 1em 0;
`;

const Homeworks = () => {
  return (
    <Page>
      <Container>
        <h1>Homeworks</h1>
      </Container>
    </Page>
  );
};

export default Homeworks;
