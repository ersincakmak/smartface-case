import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CellProps, Column } from "react-table";
import styled from "styled-components";
import LinkButton from "../components/LinkButton";
import Page from "../components/Page";
import Table from "../components/Table";
import { users } from "../data/data";
import { User } from "../types/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: min(75rem, 100%); // 1200px
  margin-inline: auto;
  padding: 1em;
  overflow: hidden;
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

const Teachers = () => {
  const [data, setdata] = useState<User[]>([]);

  const navigation = useNavigate();

  useEffect(() => {
    setdata(users.filter((item) => item.userType === "teacher"));
  }, []);

  const columns: Column<User>[] = [
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
          <LinkButton onClick={() => navigation(`/teacher/${row.original.id}`)}>
            View Details
          </LinkButton>
        );
      },
    },
  ];

  return (
    <Page>
      <Container>
        <h1>Teachers</h1>
        <TableContainer>
          <Table columns={columns} data={data} />
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Teachers;
