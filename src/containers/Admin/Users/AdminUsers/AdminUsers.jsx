import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';
import { Box, CircularProgress } from '@mui/material'
import * as actions from '../../../../Store/actions/rootAction';

import classes from './AdminUsers.module.scss';

import NewUserModal from '../../../../components/NewUserModal/NewUserModal'
import PageHeader from '../../../../components/PageHeader/PageHeader'
import UsersTable from '../../../../components/UsersTable/UsersTable'
import CustomAlert from '../../../../components/CustomAlert/CustomAlert'

function AdminUsers(props) {
  const [newUsername, setNewUsername] = useState('')

  const [newPassword, setNewPassword] = useState('')

  const [modalOpen, setModalOpen] = useState(false)

  const [page, setPage] = useState({
    limit: 9,
    offset: 0,
  })

  const [rowsPerPage, setRowsPerPage] = useState(9)

  const pageChangeHandler = (event, newPage) => {
    console.log(newPage)
    setPage({
      limit: 9,
      offset: (9 * newPage),
    })
  }

  const rowsPerPageChangeHandler = (event) => {
    const updatedValue = event.target.value
    setRowsPerPage(updatedValue)
    setPage({
      ...page,
      limit: updatedValue,
    })
  }

  const { onGetUsers } = props

  useEffect(() => {
    onGetUsers(page)
  }, [onGetUsers, page])

  const modalOpenHandler = () => {
    setModalOpen(true)
  }
  const modalCloseHandler = () => {
    setModalOpen(false)
  }

  const usernameChangeHandler = (event) => {
    const username = event.target.value
    setNewUsername(username)
  }

  const passwordChangeHandler = (event) => {
    const password = event.target.value
    setNewPassword(password)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const data = {
      username: newUsername,
      password: newPassword,
    }
    modalCloseHandler()
    props.onAddNewUser(data, page)
  }

  const deleteUserHandler = (id) => {
    props.onDeleteUser(id, page)
  }

  let rows = null

  if (props.users) {
    rows = props.users.map((user) => ({
      id: user.id,
      name: user.username,
      isStaff: user.is_staff,
    }))
  }

  let table = (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <CircularProgress />
    </Box>
  )

  if (props.users && props.count) {
    table = (
      <UsersTable
        rows={rows}
        count={props.count}
        page={page}
        pageChange={pageChangeHandler}
        rowsPerPage={rowsPerPage}
        rowsPerPageChange={rowsPerPageChangeHandler}
        deleteUser={deleteUserHandler}
      />
    )
  }

  let alert = null

  if (props.error) {
    alert = (
      <CustomAlert errors={props.error} />
    )
  }

  return (
    <div className={classes.AdminUsers}>
      {alert}
      <PageHeader
        users
        modalOpen={modalOpenHandler}
      />
      {table}
      <NewUserModal
        modalOpen={modalOpen}
        modalClose={modalCloseHandler}
        usernameChange={usernameChangeHandler}
        passwordChange={passwordChangeHandler}
        submit={submitHandler}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state.users.count,
  loading: state.users.loading,
  users: state.users.users,
  error: state.users.error,
})

const mapDispatchToProps = (dispatch) => ({
  onGetUsers: (page) => dispatch(actions.fetchUsers(page)),
  onAddNewUser: (data, page) => dispatch(actions.addNewUser(data, page)),
  onDeleteUser: (id, page) => dispatch(actions.deleteUser(id, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
