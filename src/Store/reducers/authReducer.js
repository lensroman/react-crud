import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  userId: null,
  userName: null,
  isStaff: null,
  markupUsers: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userId: action.userId,
        userName: action.userName,
        isStaff: action.isStaff,
      }
    }
    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.LOGOUT_USER: {
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
        userId: null,
        userName: null,
        isStaff: null,
      }
    }
    case actionTypes.GET_MARKUP_USERS: {
      const markupUsers = action.users.filter((user) => user.is_staff === false)
      return {
        ...state,
        markupUsers,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer;
