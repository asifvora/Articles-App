import * as types from '../constants/ActionTypes';

const initialState = {
    data: [],
    isLoading: true
};

export function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_DATA_SUCCESS:
            state = Object.assign({}, state, { data: action.state, isLoading: false });
            return state;
        case types.FETCH_DATA_FAILURE:
            state = Object.assign({}, state, { err: action.state, isLoading: false });
            return state;
        case types.FETCH_DATA_MORE_SUCCESS:
            state = Object.assign({}, state, { data: action.state, isLoading: false });
            return state;
        case types.FETCH_DATA_MORE_FAILURE:
            state = Object.assign({}, state, { err: action.state, isLoading: false });
            return state;
        case types.FILTER_SEARCH_DATA_SUCCESS:
            state = Object.assign({}, state, { data: action.state, isLoading: false });
            return state;
        case types.FILTER_SEARCH_DATA_FAILURE:
            state = Object.assign({}, state, { err: action.state, isLoading: false });
            return state;
        default:
            return state;
    }
};

export default articlesReducer;
