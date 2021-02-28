import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Post = ({post}) => {
  let navigation = useNavigation();
  const [profile_data, setprofile_data] = useState('none');
  const UsersReducer = useSelector((state) => state.UsersReducer);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const CommentsReducer = useSelector((state) => state.CommentsReducer);
  let [num, setNum] = useState('');

  useEffect(() => {
    if (UsersReducer.users.find === undefined) return;
    let pr = UsersReducer.users.find((user) => user.uid == post.user_id);
    setprofile_data(pr);
  }, [post, AuthReducer.user, UsersReducer.users]);

  useEffect(() => {
    let number =
      CommentsReducer.comments.filter == undefined
        ? null
        : CommentsReducer.comments.filter((com) => com.post_id == post.id);
    setNum(number ? number.length : '');
  }, [CommentsReducer.comments]);

  let deletePost = (id) => {
    firestore()
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  let editPost = () => {
    navigation.navigate('EditPost', {id: post.id});
    // console.log('akshdjkasd');
  };

  return AuthReducer.user == undefined ? null : (
    <View style={s.post}>
      {AuthReducer.user.uid == profile_data.uid ? (
        <View style={s.delete_and_update_btn}>
          <MaterialIcons
            onPress={() => deletePost(post.id)}
            name="delete"
            size={26}
            color="rgb(255, 122, 122)"
            style={{marginBottom: 20}}
          />
          <Feather
            onPress={editPost}
            name="edit"
            size={26}
            color="rgb(201, 186, 22)"
          />
        </View>
      ) : null}

      <View style={s.prifile_area}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {profile_data.photoURL ? (
            <Image
              source={{
                uri: profile_data ? profile_data.photoURL : null,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                marginRight: 15,
              }}
            />
          ) : (
            <FontAwesome5
              name="user-circle"
              size={50}
              color="grey"
              style={{marginRight: 15}}
            />
          )}
          <View>
            <Text style={{color: '#4d4d4d', marginBottom: 3}}>
              {profile_data ? profile_data.displayName : 'null'}
            </Text>

            <Text style={{color: 'grey', fontSize: 11}}>
              {profile_data ? profile_data.email : 'null'}
            </Text>
          </View>
        </View>
      </View>
      <View style={s.post_content}>
        {post.is_vacancy ? (
          <Text
            style={{
              color: 'black',
              marginBottom: 15,
              fontWeight: 'bold',
              color: 'rgb(73, 209, 91)',
            }}>
            ® Offering Vaccancies
          </Text>
        ) : null}
        <Text style={{color: 'grey'}}>{post.post_title}</Text>

        {post.post_image ? (
          <Image
            source={{uri: post.post_image}}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              marginTop: 30,
            }}
          />
        ) : null}
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments', {id: post.id})}
            style={s.user_btns}>
            <Text style={{color: 'grey'}}>
              {num == 0 ? null : num} {num == 1 ? 'Comment' : 'Comments'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShowUser_Data', {
                id: post ? post.user_id : '',
              })
            }
            style={s.user_btns}>
            <Text style={{color: 'grey'}}>Student Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Post;

const s = StyleSheet.create({
  post: {
    borderColor: 'rgb(210,210,210)',
    borderWidth: 2,
    borderRadius: 3,
    padding: 20,
    marginBottom: 13,
    position: 'relative',
  },
  user_btns: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'rgb(200,200,200)',
    borderWidth: 2,
    borderRadius: 3,
  },
  prifile_area: {
    marginBottom: 30,
  },
  delete_and_update_btn: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
});
