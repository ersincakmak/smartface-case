/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import CreateHomework from "../components/CreateHomework";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import { TeacherProfile } from "../components/Profile";
import Table from "../components/Table";
import { homeworks, users } from "../data/data";
import { useAppSelector } from "../redux/store";
import { CreateHomeWorkObject, Homeworks } from "../types/homework";
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

const SwitcherContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const Label = styled.label<{
  checked: boolean;
}>`
  display: block;
  font-size: 1.2rem;
  padding: 0.2em 0.5em;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;

  ${(props) =>
    props.checked === true && {
      backgroundColor: "white",
      boxShadow: "2px 2px 5px -2px  #00000025",
    }}

  input {
    display: none;
  }
`;

const Button = styled.button`
  display: inline-block;
  width: max-content;
  background-color: ${(props) => props.theme.colors.button.primary.base};
  padding: 0.5em;
  border-radius: 5px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 2px 2px 5px -2px #00000025;
  :hover {
    background-color: ${(props) => props.theme.colors.button.primary.hovered};
  }
`;

const Popup = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  background-color: #00000025;
  z-index: 3;
`;

const Teacher = () => {
  const [teacher, setteacher] = useState<User>();
  const [columns, setcolumns] = useState<Column<Homeworks>[] | Column<User>[]>(
    []
  );
  const [students, setstudents] = useState<User[]>([]);
  const [homeworkState, sethomeworkState] = useState<Homeworks[]>([]);
  const [tableType, settableType] = useState<"homeworks" | "students">(
    "homeworks"
  );
  const [popup, setpopup] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const navigation = useNavigate();

  const homeWorkColumns: Column<Homeworks>[] = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
  ];

  const studenstColumns: Column<User>[] = [
    {
      Header: "Photo",
      accessor: "avatar",
      Cell: ({ row }: CellProps<User>) => (
        <img src={row.original.avatar} alt="ProfileImage" />
      ),
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Actions",
      accessor: undefined,
      Cell: ({ row }: CellProps<User>) => {
        return (
          <LinkButton onClick={() => navigation(`/student/${row.original.id}`)}>
            View Details
          </LinkButton>
        );
      },
    },
  ];

  useEffect(() => {
    if (user?.userType === "teacher" && user.id !== id) {
      navigation(`teacher/${user.id}`);
    } else {
      setteacher(users.find((item) => item.id === id));
      setcolumns(homeWorkColumns);
    }
  }, []);

  useEffect(() => {
    setcolumns(homeWorkColumns);
    sethomeworkState(homeworks.filter((item) => item.publisherId === id));
    setstudents(users.filter((item) => item.teacherId === id));
  }, []);

  useEffect(() => {
    if (tableType === "homeworks") {
      setcolumns(homeWorkColumns);
    } else {
      setcolumns(studenstColumns);
    }
  }, [tableType]);

  const handleChangeTableType = (value: "homeworks" | "students") => {
    settableType(value);
  };

  const createHomeworkSubmit = (values: CreateHomeWorkObject) => {
    sethomeworkState([
      ...homeworkState,
      {
        id: uuidv4(),
        description: values.description,
        title: values.title,
        publisherId: teacher?.id as string,
      },
    ]);
    setpopup(false);
  };

  if (!teacher) {
    return null;
  }

  return (
    <Page>
      <Container>
        {popup && (
          <Popup>
            <CreateHomework
              onCancel={() => setpopup(false)}
              onSubmit={(values: CreateHomeWorkObject) =>
                createHomeworkSubmit(values)
              }
            />
          </Popup>
        )}
        <TeacherProfile {...teacher} />
        <SwitcherContainer>
          {user?.userType === "teacher" && (
            <Button onClick={() => setpopup(true)}>New Homework</Button>
          )}
          <Label checked={tableType === "homeworks"}>
            Homeworks
            <input
              type="radio"
              name="tableType"
              value="homeworks"
              checked={tableType === "homeworks"}
              onChange={(e) => handleChangeTableType(e.target.value as any)}
            />
          </Label>
          <Label checked={tableType === "students"}>
            Students
            <input
              type="radio"
              name="tableType"
              value="students"
              checked={tableType === "students"}
              onChange={(e) => handleChangeTableType(e.target.value as any)}
            />
          </Label>
        </SwitcherContainer>
        <TableContainer>
          <Table
            columns={columns}
            data={tableType === "homeworks" ? homeworkState : students}
          />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Teacher;
