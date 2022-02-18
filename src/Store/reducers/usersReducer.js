import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.GET_USERS_SUCCESS: {
      const users = action.users.filter((user) => user.is_staff === false)
      return {
        ...state,
        loading: false,
        users,
      }
    }
    case actionTypes.ADD_NEW_USER_SUCCESS: {
      return {
        ...state,
        error: {
          message: 'Пользователь успешно создан',
        },
      }
    }
    case actionTypes.CLEAN_ERRORS: {
      return {
        ...state,
        error: null,
      }
    }
    case actionTypes.GET_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
