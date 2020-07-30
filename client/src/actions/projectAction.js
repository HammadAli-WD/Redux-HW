const apiKey = process.env.REACT_APP_API_KEY || "http://localhost:3000";
export const FETCH_PROJECTS_BEGIN   = 'FETCH_PROJECTS_BEGIN';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export function fetchProjects() {
    return dispatch => {
      dispatch(fetchProjectsBegin());
      return fetch(apiKey + "/student/" + this.props.match.params.id + "/projects")
        .then(handleErrors)
        .then(res => res.json())
       
        .then(json => {
          dispatch(fetchProjectsSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchProjectsFailure(error)));
    };
  }
  export const fetchProjectsBegin = () => ({
    type: FETCH_PROJECTS_BEGIN
  });
  
  export const fetchProjectsSuccess = json => ({
    type: FETCH_PROJECTS_SUCCESS,
    payload: { json }
  });
  
  export const fetchProjectsFailure = error => ({
    type: FETCH_PROJECTS_FAILURE,
    payload: { error }
  });
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }