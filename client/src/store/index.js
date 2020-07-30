import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import isModalOpen from "../reducers";
import  projectReducer  from "../reducers/projectReducer"

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const initialState = {
    isModalOpen: false,  
    projects:[],
    loading: false,
    error: null

}

const bigReducer = combineReducers({ isModalOpen: isModalOpen, projects: projectReducer });

export default function configureStore(){
    return createStore(
        bigReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
      );
}