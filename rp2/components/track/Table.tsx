import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Card } from "@/components/track/Card";
import { Button } from "@mui/material";
import { DUMMY_DATA, rows,columns } from "@/data/data";

  interface Data {
  idx: number;
  year: string;
 
}
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [selectedRow, setSelectedRow] = React.useState<Data | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleFormClick(row: Data) {
    setSelectedRow(row);
  }

  function handleBack() {
    setSelectedRow(null);
  }

  return (
    <>
      {!selectedRow ? (
        // ---- Table View ----
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
      ) : (
        // ---- Grid View ----
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Records for {selectedRow.year}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DUMMY_DATA[selectedRow.idx - 1]?.map((item, i) => (
              <Card key={i} title={item.title} persentage={item.persentage} />
            ))}
          </div>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ marginTop: 3, backgroundColor: "#22d3ee" }}
          >
            Back to Table
          </Button>
        </div>
      )}
    </>
  );
}
