export default function (state = {}, action) {
    switch (action.type) {
      case "show":
        return {
            ...state,
            openModal: true
        };
      
      
      default:
        return state;
    }
  }
  
