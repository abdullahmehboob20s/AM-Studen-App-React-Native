import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {get_users} from '../redux/actions/UsersReducer_Actions';
import Post from './Post';
import {load_posts} from '../redux/actions/PostsReducer_Actions';
import {load_comments} from '../redux/actions/CommentsReducer_Actions';

const Home = (props) => {
  let {navigation} = props;
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const UsersReducer = useSelector((state) => state.UsersReducer);
  const PostsReducer = useSelector((state) => state.PostsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_users());
    dispatch(load_posts());
    dispatch(load_comments());
  }, []);

  return PostsReducer.posts ? (
    <View style={s.posts}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={PostsReducer.posts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color="darkslateblue" size={30} />
    </View>
  );
};

export default Home;

const s = StyleSheet.create({
  posts: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
