import React from 'react';
import {
  Button,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
} from '@mui/material'

function UsersTable(props) {
  return (
    <div>
      <TableContainer sx={{ maxWidth: '100%' }} component={Paper}>
        <Table sx={{ maxWidth: '100%' }}>
          <TableHead sx={{ borderBottom: '1px solid #eee' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                ID
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Имя пользователя
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Роль
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  {row.id}
                </TableCell>
                <TableCell align="right">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.isStaff ? 'Администратор' : 'Разметчик'}
                </TableCell>
                <TableCell align="right">
                  <Button color="error" variant="outlined" onClick={() => props.deleteUser(row.id)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={props.count}
        page={Math.ceil(props.page.offset / 9)}
        onPageChange={props.pageChange}
        rowsPerPageOptions={[9, 18, 27]}
        rowsPerPage={props.rowsPerPage}
        onRowsPerPageChange={(event) => props.rowsPerPageChange(event)}
      />
    </div>
  )
}

export default UsersTable
