import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {logout_user} from '../redux/actions/AuthReducer_Actions';
import Post from './Post';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

const ShowProfile = ({navigation}) => {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const PostsReducer = useSelector((state) => state.PostsReducer);
  const UsersReducer = useSelector((state) => state.UsersReducer);
  const [data, setdata] = useState({});
  let dispatch = useDispatch();

  useEffect(() => {
    let a = PostsReducer.posts.filter(
      (a) => a.user_id === AuthReducer.user.uid,
    );
    setdata(a);
  }, [PostsReducer]);

  let userlogout = () => {
    dispatch(logout_user());
  };

  return (
    <View style={s.container}>
      <View>
        <View style={s.profilePhoto}>
          {AuthReducer.user.photoURL ? (
            <Image source={{uri: AuthReducer.user.photoURL}} style={s.image} />
          ) : (
            <FontAwesome5
              name="user-circle"
              style={{marginRight: 20}}
              size={85}
              color="grey"
            />
          )}
          <View>
            <Text
              style={{
                color: 'black',
                marginTop: 15,
                marginBottom: 5,
                textTransform: 'capitalize',
              }}>
              {AuthReducer.user.displayName}
            </Text>
            <Text style={{color: 'grey', fontSize: 11}}>
              {AuthReducer.user.email}
            </Text>
            {AuthReducer.user.school === '' ? null : (
              <Text
                style={{
                  color: 'grey',
                  marginTop: 10,
                  textTransform: 'capitalize',
                  fontSize: 14,
                }}>
                <Text style={{fontWeight: 'bold', color: 'rgb(106, 211, 71)'}}>
                  Studying in{' '}
                </Text>
                {AuthReducer.user.school}
              </Text>
            )}
          </View>
        </View>

        <View style={s.twoButtons}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={s.buttons}
            onPress={() => navigation.navigate('Create_Post')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Create Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={s.buttons}
            onPress={() => navigation.navigate('YourInfo')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Your Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={s.buttons}
            onPress={userlogout}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={s.buttons}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {data.length} posts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.posts}>
        {data ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => <Post post={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ShowProfile;

const s = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f2f2',
  },
  posts: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 60,
  },

  deleteUpdate_Icon: {
    position: 'absolute',
    bottom: 55,
    right: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: 80,
  },
  ViewDetailsButton: {
    backgroundColor: '#004d99',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 3,
  },
  yourPosts_title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#e6e6e6',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginRight: 20,
  },
  profilePhoto: {
    height: 150,
    flexDirection: 'row',
    // justifyContent : "center",
    alignItems: 'center',
    backgroundColor: '#e6ffff',
    paddingHorizontal: 20,
  },
  twoButtons: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#80bfff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 4,
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
  },
  Donorposts: {
    flex: 1,
    backgroundColor: 'red',
  },
  donor: {
    backgroundColor: 'white',
    marginBottom: 10,
    height: 260,
    padding: 15,
    position: 'relative',
    justifyContent: 'space-between',
  },
  bloodView: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  bloodView_text: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloodView_icon: {
    fontSize: 70,
  },

  donorPosts: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e6e6e6',
    paddingVertical: 20,
    paddingBottom: 70,
  },
});
