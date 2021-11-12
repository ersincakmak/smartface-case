import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import Table from "../components/Table";
import { homeworks, users } from "../data/data";
import { Homeworks } from "../types/homework";

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

const TableContainer = styled.div`
  flex: 1;
  overflow: auto;

  img {
    width: 3.125rem; // 50px
    height: 3.125rem; // 50px
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CustomCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 1em;
`;

const HomeworksPage = () => {
  const [data, setdata] = useState<Homeworks[]>([]);

  const navigation = useNavigate();

  useEffect(() => {
    setdata(homeworks);
  }, []);

  const columns: Column<Homeworks>[] = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Teacher",
      accessor: "publisherId",
      Cell: ({ cell }: CellProps<Homeworks>) => {
        const teacherID = cell.value;

        const teacher = users.find((item) => item.id === teacherID);

        const fullName = teacher?.firstName + " " + teacher?.lastName;

        return (
          <CustomCell>
            <img src={teacher?.avatar} alt="ProfileImage" />
            <LinkButton onClick={() => navigation(`/teacher/${teacher?.id}`)}>
              {fullName}
            </LinkButton>
          </CustomCell>
        );
      },
    },
  ];

  if (!data) {
    return null;
  }

  return (
    <Page>
      <Container>
        <h1>Homeworks</h1>
        <TableContainer>
          <Table columns={columns} data={data} />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default HomeworksPage;
