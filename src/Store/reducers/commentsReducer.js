import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: false,
    comments: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_COMMENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                comments: action.data
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;