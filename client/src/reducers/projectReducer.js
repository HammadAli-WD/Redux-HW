import {
    FETCH_PROJECTS_BEGIN,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE
  } from '../actions/projectAction';
  
  export default function projectReducer(state = {}, action) {
    switch(action.type) {
      case FETCH_PROJECTS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_PROJECTS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the data with the ones from the server
        return {
          ...state,
          loading: false,
          data: action.payload.projects
        };
  
      case FETCH_PROJECTS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have data to display anymore, so set `data` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the data around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          data: []
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }