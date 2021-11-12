import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../redux/store";

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: min(75rem, 100%); // 1200px
  padding: 1em 0;
  margin-inline: auto;
  border-bottom: 2px solid ${(props) => props.theme.colors.text.primary};
`;

const Links = styled.ul`
  display: flex;
  flex-direction: row;
  width: max-content;
  gap: 1em;
`;

const Link = styled(NavLink)`
  color: ${(props) => props.theme.colors.text.gray};
  padding: 0.2em 0.5em;
  transition: all 0.2s ease;
  font-size: 1.125rem; // 18px
  :hover {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: underline;
  }
`;

const Nav = () => {
  const { user } = useAppSelector((state) => state.user);

  const PrincipalRoutes = [
    {
      path: "/teachers",
      label: "Teachers",
    },
    {
      path: "/students",
      label: "Students",
    },
    {
      path: "/homeworks",
      label: "Homeworks",
    },
  ];

  // const TeacherRoutes = [
  //   {
  //     path: `/students/${user?.username}`,
  //   },
  // ];

  return (
    <Container>
      <h1>Homework Platform</h1>
      <Links>
        {user?.userType === "principal"
          ? PrincipalRoutes.map((item) => (
              <Link to={item.path} key={item.path}>
                {item.label}
              </Link>
            ))
          : null}
      </Links>
    </Container>
  );
};

export default Nav;
