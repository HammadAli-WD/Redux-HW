export default function (state = {}, action) {
    switch (action.type) {
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
  
