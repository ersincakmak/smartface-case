/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import { StudentProfile } from "../components/Profile";
import Table from "../components/Table";
import { completedHomeworks, homeworks, users } from "../data/data";
import { CompletedHomeworks, Homeworks } from "../types/homework";
import { User } from "../types/user";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow: hidden;
  width: min(75rem, 100%); // 1200px
  margin-inline: auto;
  padding-top: 1em;
`;

const Label = styled.label<{
  checked: boolean;
}>`
  display: inline-block;
  width: max-content;
  font-size: 1.2rem;
  padding: 0.2em 0.5em;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  box-shadow: 2px 2px 5px -2px #00000025;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const Student = () => {
  const [student, setstudent] = useState<User>();
  const [data, setdata] = useState<Homeworks[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const st = users.find((item) => item.id === id);
    setstudent(st);
    setdata(homeworks.filter((item) => item.publisherId === st?.teacherId));
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
      Header: "Answer",
      accessor: undefined,
      Cell: ({ row }: CellProps<Homeworks>) => {
        const homeworkID = row.original.id;
        const document = completedHomeworks.find(
          (item) =>
            item.homeworkId === homeworkID && item.studentId === student?.id
        );

        if (document) {
          return (
            <a href={document.document} download="homework">
              <LinkButton type="button">Download</LinkButton>
            </a>
          );
        } else {
          return "Not yet completed";
        }
      },
    },
  ];

  if (!student) {
    return null;
  }

  return (
    <Page>
      <Container>
        <StudentProfile {...student} />
        <Label checked={true}>Homeworks</Label>
        <TableContainer>
          <Table columns={columns} data={data} />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Student;
