const userAuthReducers = (state=null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        
        user: action.payload,
      };
    case 'SET_USER_NULL':
      return {
        ...state,
    
        user: null,
      };
    default:
      return state;
  }
}
export default userAuthReducers;