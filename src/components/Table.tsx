import React from "react";
import { useTable, Column } from "react-table";
import styled from "styled-components";
import { User } from "../types/user";

const TableContainer = styled.table`
  width: 100%;
  border: none;
  border-spacing: 0;
  min-width: max-content;
  font-size: 1rem;

  td,
  th {
    padding: 0.5em 1em;
  }
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.colors.background};

  th {
    font-weight: 600;
    text-align: start;
    border-bottom: 2px solid black;
  }
`;

const TableBody = styled.tbody`
  width: 100%;
  tr {
    width: 100%;
    :nth-child(2n-1) {
      background-color: white;
    }

    :hover {
      background-color: ${(props) => props.theme.colors.table.hover};
    }
  }
`;

interface Props<T extends User> {
  columns: Column<T>[];
  data: T[];
}

const Table: React.FC<Props<User>> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <TableContainer {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={cell.column.Header === "Photo" ? "photo" : ""}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </TableBody>
    </TableContainer>
  );
};

export default Table;
