export default function (state = {}, action) {
    switch (action.type) {
      case "SHOW_CREATE_STUD_MODAL":
        return {
            ...state,
            isCreateStudModalOpen: true
        };
      
        case "HIDE_CREATE_STUD_MODAL":
            return {
                ...state,
                isCreateStudModalOpen: false
            };
      default:
        return state;
    }
  }
  
