import * as actionTypes from '../actions/actionTypes';

const initialState = {
  count: null,
  loading: false,
  error: null,
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.FETCH_USERS_SUCCESS: {
      const users = action.users.filter((user) => user.is_staff === false)
      return {
        ...state,
        loading: false,
        count: action.count,
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
    case actionTypes.FETCH_USERS_FAIL: {
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
