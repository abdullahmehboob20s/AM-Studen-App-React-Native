import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import UsersReducer from './UsersReducer';
import PostsReducer from './PostsReducer';
import CommentsReducer from './CommentsReducer';

let AllReducers = combineReducers({
  AuthReducer,
  UsersReducer,
  PostsReducer,
  CommentsReducer,
});

export default AllReducers;
