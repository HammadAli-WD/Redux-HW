export default function (state = {}, action) {
  switch (action.type) {

      case "GET_STUDENT_LIST":
          return {
              ...state,
              students: action.payload,
          };
      case "GET_PROJECT_LIST":
          return {
              ...state,
              projects: action.payload,
          };
      case "GET_ALL_PROJECTS":
          return {
              ...state,
              projectList: action.payload,
          };
      case "TOTAL_STUDENTS":
          return {
              ...state,
              numOfStudent: action.payload,
          };
      case "SORTING_KEYS":
          return {
              ...state,
              sortingKeys: action.payload,
          };
      case "SET_SORTING_KEY":
          return {
              ...state,
              selectedKey: action.payload,
          };
      case "SET_ORDER":
          return {
              ...state,
              orderKey: action.payload,
          };
      default:
          return state;
  }
}