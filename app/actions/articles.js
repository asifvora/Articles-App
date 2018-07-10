import * as types from '../constants/ActionTypes';
const baseURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=02ffbe955b5442978b98dfb6c23b09fd`;

/**
 * fetching data from api called
 */
export function fetchArticles() {
    return dispatch =>
        fetch(baseURL)
            .then(response => response.json())
            .then(json => dispatch(fetchArticlesSuccess(json)))
            .catch(err => dispatch(fetchArticlesSuccess(err)));
}

function fetchArticlesSuccess(json) {
    let respose = {
        data: json.articles,
        success: true
    };

    return {
        state: respose,
        type: types.FETCH_DATA_SUCCESS,
    };
}

function fetchArticlesFailure(err) {
    let respose = {
        err: err,
        success: false
    };

    return {
        state: respose,
        type: types.FETCH_DATA_FAILURE,
    };
}



/**
 * fetching more data from api called
 */
export function fetchMoreArticles() {
    return (dispatch, getState) => {
        const { articlesReducer } = getState();
        fetch(baseURL)
            .then(response => response.json())
            .then(json => dispatch(fetchMoreArticlesSuccess(articlesReducer.data.data, json)))
            .catch(err => dispatch(fetchMoreArticlesFailure(err)));
    }
}

function fetchMoreArticlesSuccess(data, json) {
    let respose = {
        data: data.concat(json.articles),
        success: true
    };

    return {
        state: respose,
        type: types.FETCH_DATA_MORE_SUCCESS,
    };
}

function fetchMoreArticlesFailure(err) {
    let respose = {
        err: err,
        success: false
    };

    return {
        state: respose,
        type: types.FETCH_DATA_MORE_FAILURE,
    };
}

/**
 * filter search data 
 */
export function filterSearchData(text) {
    return (dispatch, getState) => {
        const { articlesReducer } = getState();
        let dataArr = articlesReducer.data.data;
        let filterData = [];
        if (dataArr) {
            filterData = dataArr.filter(function (data) {
                return data.title.startsWith(text);
            });
        }
        if (filterData.length !== 0) {
            dispatch(filterSearchDataSuccess(filterData));
        } else {
            dispatch(filterSearchDataFailure('no data found'));
        }
    }
}

function filterSearchDataSuccess(json) {
    let respose = {
        data: json,
        success: true
    };

    return {
        state: respose,
        type: types.FILTER_SEARCH_DATA_SUCCESS,
    };
}


function filterSearchDataFailure(err) {
    let respose = {
        err: err,
        success: false
    };

    return {
        state: respose,
        type: types.FILTER_SEARCH_DATA_FAILURE,
    };
}