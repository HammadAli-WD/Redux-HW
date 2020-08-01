export default function (state = {}, action) {
    switch (action.type) {
      case "SET_LOADER":
            return {
                ...state,
                loading: action.payload,
            };
        case "UNSET_LOADER":
            return {
                ...state,
                loading: action.payload,
            };
        case "LOADING_ERROR":
            return {
                ...state,
                error: action.payload,
            };
      case "SHOW_CREATE_STUD_MODAL":
        return {
            ...state,
            isModalOpen: true
        };
      
        case "HIDE_CREATE_STUD_MODAL":
            return {
                ...state,
                isModalOpen: false
            };

            
      default:
        return state;
    }
  }
  
