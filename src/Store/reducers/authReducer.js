import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;