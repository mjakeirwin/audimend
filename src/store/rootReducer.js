import { combineReducers } from 'redux';
import HomeReducer from '../pages/Home/HomeReducer.js';
import SearchReducer from '../pages/SearchResult/SearchResultReducer.js';


const rootReducer = combineReducers({

    home: HomeReducer,

});

export default rootReducer;