export default function (state = {}, action) {
    switch (action.type) {
      case "show":
        return {
            ...state,
            openModal: true
        };
      case "onClose":       
      return {
        ...state,
        openModal: false
     }
  
      
      default:
        return state;
    }
  }
  