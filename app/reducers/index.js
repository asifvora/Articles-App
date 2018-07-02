import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer";
import articlesReducer from "./articlesReducer";

const reducer = combineReducers({
    articlesReducer,
    navigationReducer
});

export default reducer;
