import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import firebase from '@react-native-firebase/app';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-customized-image-picker';

const YourInfo = ({navigation}) => {
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  let takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      firestore()
        .collection('users')
        .doc(AuthReducer.user.uid)
        .update({
          photoURL: image[0].path,
        })
        .then((d) => {
          console.log('User updated!');
        });
    });
  };

  let chooseFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: false,
    }).then((image) => {
      firestore()
        .collection('users')
        .doc(AuthReducer.user.uid)
        .update({
          photoURL: image[0].path,
        })
        .then(() => {
          console.log('User updated!');
        });
    });
  };

  return AuthReducer.user ? (
    <ScrollView>
      <View style={s.container}>
        <View style={s.todos}>
          <View style={s.todoImage}>
            {AuthReducer.user.photoURL ? (
              <Image
                source={{uri: AuthReducer.user.photoURL}}
                style={{width: 100, height: 100}}
              />
            ) : (
              <FontAwesome5 name="user-circle" size={85} color="grey" />
            )}

            <View>
              <TouchableOpacity style={s.updatingPhoto}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#034f84',
                    fontWeight: 'bold',
                  }}
                  onPress={() => takePhoto()}>
                  Take Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={chooseFromGallery}
                style={s.updatingPhoto}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#034f84',
                    fontWeight: 'bold',
                  }}>
                  Choose From Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={s.deleteAccountButton}
            onPress={() => navigation.navigate('Edit_Profile')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Update Your Profile
            </Text>
            <FontAwesome5 name="edit" size={20} color="white" />
          </TouchableOpacity>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.displayName}
            </Text>

            <Text style={s.badge}>User Name :</Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.email}
            </Text>
            <Text style={s.badge}>Email :</Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.school}
            </Text>
            <Text style={s.badge}>School / Collage : </Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.age}
            </Text>
            <Text style={s.badge}>age : </Text>
          </View>
          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.phoneNumber}
            </Text>
            <Text style={s.badge}>Number : </Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.hobbies}
            </Text>
            <Text style={s.badge}>Hobbies : </Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.skills}
            </Text>
            <Text style={s.badge}>Skills : </Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.aboutYourSelf}
            </Text>
            <Text style={s.badge}>About Me : </Text>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.city}
            </Text>
            <Text style={s.badge}>City : </Text>
          </View>
          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {AuthReducer.user.district}
            </Text>
            <Text style={s.badge}>District : </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color="#004080" size={30} />
    </View>
  );
};

export default YourInfo;

const s = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: 'rgb(235,235,235)',
    paddingBottom: 30,
  },
  inputAndButton: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#cce6ff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  deleteAccountButton: {
    height: 50,
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20,
    color: 'grey',
  },
  inputButton: {
    flex: 0.28,
    backgroundColor: '#4da6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    borderRadius: 4,
  },
  todos: {
    // flex : 1,
    padding: 15,
  },
  todo: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 60,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 3,
    position: 'relative',
  },
  todoImage: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 50,
    minHeight: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 3,
    position: 'relative',
  },
  updatingInut: {
    borderWidth: 2,
    borderColor: '#d9d9d9',
    width: 200,
    height: 33,
    justifyContent: 'center',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  badge: {
    position: 'absolute',
    top: -30,
    left: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  updatingPhoto: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#034f84',
    borderRadius: 3,
    marginTop: 4,
    textAlign: 'center',
  },
});
