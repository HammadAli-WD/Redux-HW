import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import statusReducer  from "../reducers/status";
import dataReducer from "../reducers/data"
//import  projectReducer  from "../reducers/projectReducer"

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const initialState = {
   /*  isModalOpen: false, */  
    status: {
        loading: false,
        error: '',
    },
    data: {
        projects: [],
        projectList: [],

        students: [],
        totalNumberOfStudents: null,
        numPerPage: 2,
        currentPageNum: 1,
        sortingKeys: [],
        selectedKey: '',
        orderKey: 'desc',
        orderKeysArray: ['asc', 'desc'],
        newStudent: {
            name: "",
            surname: "",
            email: "",
            dateofbirth: '',
            country: ''
        },
        editStudentInfo: {
            name: "",
            surname: "",
            email: "",
            dateofbirth: '',
            country: ''
        },
        addModal: false,
        editModal: false,
        photo: '',
        studentId: ''
    },
   

}

//const bigReducer = combineReducers({ isModalOpen: isModalOpen, projects: projectReducer });
const bigReducer = combineReducers({ status: statusReducer, data: dataReducer });

export default function configureStore(){
    return createStore(
        bigReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
      );
}