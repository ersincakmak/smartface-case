/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import { TeacherProfile } from "../components/Profile";
import Table from "../components/Table";
import { homeworks, users } from "../data/data";
import { Homeworks } from "../types/homework";
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

const Teacher = () => {
  const [teacher, setteacher] = useState<User>();
  const [columns, setcolumns] = useState<Column<Homeworks>[] | Column<User>[]>(
    []
  );
  const [data, setdata] = useState<User[] | Homeworks[]>([]);
  const [tableType, settableType] = useState<"homeworks" | "students">(
    "homeworks"
  );

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
    setteacher(users.find((item) => item.id === id));
    setcolumns(homeWorkColumns);
  }, []);

  useEffect(() => {
    if (tableType === "homeworks") {
      setcolumns(homeWorkColumns);
      setdata(homeworks.filter((item) => item.publisherId === id));
    } else {
      setcolumns(studenstColumns);
      setdata(users.filter((item) => item.teacherId === id));
    }
  }, [tableType]);

  const handleChangeTableType = (value: "homeworks" | "students") => {
    settableType(value);
  };

  if (!teacher) {
    return null;
  }

  return (
    <Page>
      <Container>
        <TeacherProfile {...teacher} />
        <SwitcherContainer>
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
          <Table columns={columns} data={data} />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Teacher;
