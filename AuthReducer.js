let iState = {
  user: 'none',
};

const AuthReducer = (state = iState, action) => {
  switch (action.type) {
    case 'Sign_IN':
      return {
        user: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
