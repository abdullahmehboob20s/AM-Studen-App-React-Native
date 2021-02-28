let iState = {
  users: 'none',
};

let UsersReducer = (state = iState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        users: action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
