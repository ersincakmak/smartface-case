import React from "react";
import styled from "styled-components";
import { User } from "../types/user";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
  padding: 1em;
  border-radius: 10px;
  background-color: white;

  @media only screen and (max-width: 40rem) {
    flex-direction: column;
    gap: 0;
  }
`;

const Image = styled.img`
  width: 12.5rem; // 200px
  height: 12.5rem;
  border-radius: 5px;
  object-fit: cover;

  @media only screen and (max-width: 40rem) {
    width: 100%;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;

  @media only screen and (max-width: 40rem) {
    gap: 0.4em;
    padding: 0.4em;
  }
`;

const Text = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.2rem;
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: 1.4rem;
`;

interface Props extends User {}

const Profile: React.FC<Props> = ({ ...user }) => {
  return (
    <Container>
      <Image src={user.avatar} alt="ProfileImage" />
      <Information>
        <Title>{user.userType.toUpperCase()}</Title>
        <Text>Firstname: {user.firstName}</Text>
        <Text>Lastname: {user.lastName}</Text>
        <Text>Username: {user.username}</Text>
      </Information>
    </Container>
  );
};

export default Profile;
