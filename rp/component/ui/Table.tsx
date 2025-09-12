import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Card } from "../Card";





interface Column {
  id: "idx" | "year" ;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "idx", label: "No", minWidth: 170 },
  { id: "year", label: "Region Wise Data", minWidth: 100 },

];

interface Data {
  idx: number;
  year: string;
 
}

function createData(
  idx: number,
  year: string,
  
): Data {
  return { idx, year  };
}

const rows = [
  createData(1, "2021-2023"),
  createData(2, "2023 - 2024"),
  createData(3, "2024 - 2025"),
  createData(4, "2011-2020"),
  createData(5, "2012-2013" ),
  createData(6, "2013-2014"),
  createData(7, "2014-2015"),
  createData(8, "2015-2016"), 
  createData(9, "2016-2017"),
  createData(10, "2017-2018"),
  createData(11, "2018-2019"),
  createData(12, "2019-2020"),
  createData(13, "2020-2021"),
  createData(14, "2021-2022"),

];

  const DUMMY_DATA = [
    { title: "Structural", persentage: 80 },
    { title: "Rail", persentage: 90 },
    { title: "Sleeper", persentage: 70 },
    { title: "Ballast", persentage: 95 },
    { title: "Environmental", persentage: 99 },
    { title: "Bridge", persentage: 88 },
    { title: "Switch", persentage: 76 },
    { title: "Signal", persentage: 85 },
    { title: "Track Bed", persentage: 92 },
  ];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // state to store the rendered component
  const [selectedCard, setSelectedCard] = React.useState<React.ReactNode | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleFormClick(row: Data) {
    DUMMY_DATA.map((item, index) => {
      if (index === row.idx - 1) {
        setSelectedCard(<Card title={item.title} persentage={item.persentage} />);
      }
    });
  }
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(to bottom right, rgba(17,24,39,0.7), rgba(39,39,42,0.6))",
          border: "1px solid rgba(34,211,238,0.2)",
          backdropFilter: "blur(8px)",
          color: "#22d3ee",
          "& .MuiTableCell-root": {
            color: "#22d3ee",
          },
          "& .MuiTableHead-root .MuiTableCell-root": {
            color: "#06b6d4",
            fontWeight: 700,
          },
        }}
      >
        <TableContainer sx={{ maxHeight: 440, color: "#22d3ee" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      background:
                        "linear-gradient(to bottom right, rgba(2,24,39,0.7), rgba(3,39,42,0.6))",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.idx}
                    onClick={() => handleFormClick(row)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Render the clicked card below the table */}
      <div style={{ marginTop: "20px" }}>{selectedCard}</div>
    </>
  );
}
