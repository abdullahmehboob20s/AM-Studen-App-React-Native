let iState = {
  comments: 'none',
};

let CommentsReducer = (state = iState, action) => {
  switch (action.type) {
    case 'LOAD_COMMENTS':
      return {
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default CommentsReducer;
