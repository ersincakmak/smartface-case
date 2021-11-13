/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import FileUpload from "../components/FileUpload";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import { StudentProfile } from "../components/Profile";
import Table from "../components/Table";
import { completedHomeworks, homeworks, users } from "../data/data";
import { useAppSelector } from "../redux/store";
import { CompletedHomeworks, Homeworks } from "../types/homework";
import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

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

const Popup = styled.div`
  display: flex;
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000007f;
  z-index: 3;
  padding: 1em;
`;

const Student = () => {
  const [student, setstudent] = useState<User>();
  const [data, setdata] = useState<Homeworks[]>([]);
  const [myHomeworks, setmyHomeworks] = useState<CompletedHomeworks[]>([]);
  const [popup, setpopup] = useState<{
    id: string;
    open: boolean;
  }>();

  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const st = users.find((item) => item.id === id);
    setstudent(st);
    setdata(homeworks.filter((item) => item.publisherId === st?.teacherId));
    setmyHomeworks(completedHomeworks.filter((item) => item.studentId === id));
  }, []);

  const columns: Column<Homeworks>[] = useMemo(
    () => [
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
          const document = myHomeworks.find(
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
            if (user?.userType === "student") {
              return (
                <LinkButton
                  onClick={() =>
                    setpopup({
                      open: true,
                      id: row.original.id,
                    })
                  }
                >
                  Upload File
                </LinkButton>
              );
            } else {
              return "Not yet completed";
            }
          }
        },
      },
    ],
    [myHomeworks]
  );

  const myData = useMemo(() => data, [myHomeworks]);

  const fileUploadSubmit = (file: any) => {
    setmyHomeworks([
      ...myHomeworks,
      {
        homeworkId: popup?.id as string,
        document: file,
        id: uuidv4(),
        studentId: user?.id as string,
      },
    ]);
  };

  if (!student) {
    return null;
  }

  return (
    <Page>
      <Container>
        {popup?.open && (
          <Popup>
            <FileUpload
              onSubmit={(file: any) => {
                setpopup({
                  id: "",
                  open: false,
                });
                fileUploadSubmit(file);
              }}
              onCancel={() =>
                setpopup({
                  id: "",
                  open: false,
                })
              }
            />
          </Popup>
        )}
        <StudentProfile {...student} />
        <Label checked={true}>Homeworks</Label>
        <TableContainer>
          <Table columns={columns} data={myData} />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Student;
