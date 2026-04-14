export const initialState = {
  loading: true,
  isAuth: false,
  socket: "",
};

export const formReducer = (state, action) => {
  const value = action.payload;
  switch (action.type) {
    case "loading":
      return {...state,loading:value}
    case "isAuth":
      return {...state,isAuth:value}
    case "socket":
      return {...state,socket:value}

    default:
        return state;
      
  }
};
