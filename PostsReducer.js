let iState = {
  posts: 'none',
};

let PostsReducer = (state = iState, action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default PostsReducer;
