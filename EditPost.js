import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-customized-image-picker';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  Switch,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const EditPost = (props) => {
  let {route, navigation} = props;
  let {id} = route.params;
  console.log(id);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const PostsReducer = useSelector((state) => state.PostsReducer);
  const [data, setdata] = useState({
    post_image: '',
    post_title: '',
    user_id: AuthReducer.user.uid,
    is_vacancy: false,
    applied_students: [],
  });

  let submittingData = async () => {
    if (!data.post_title) return;
    try {
      firestore()
        .collection('posts')
        .doc(id)
        .update(data)
        .then(() => {
          console.log('User updated!');
          navigation.goBack();
        });
    } catch (error) {
      console.log(error);
    }
  };

  let take_photo = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setdata({
        ...data,
        post_image: image[0].path,
      });
    });
  };

  let chooseFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: false,
    }).then((image) => {
      setdata({
        ...data,
        post_image: image[0].path,
      });
    });
  };

  useEffect(() => {
    let find = PostsReducer.posts.find((post) => post.id === id);
    setdata(find);
  }, [id]);

  return (
    <ScrollView>
      <View style={s.container}>
        <TextInput
          onSubmitEditing={submittingData}
          returnKeyLabel="Update"
          style={s.inputStyle}
          value={data ? data.post_title : 'null'}
          onChangeText={(e) => setdata({...data, post_title: e})}
          placeholder="Edit Your Name"
        />
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            marginVertical: 30,
          }}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={data.is_vacancy ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() =>
              setdata({...data, is_vacancy: !data.is_vacancy})
            }
            value={data.is_vacancy}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: data.is_vacancy ? '#81b0ff' : 'rgb(76, 86, 170)',
            }}>
            {data.is_vacancy
              ? 'Providing A Vaccancy'
              : 'Not Providing A Vaccancy'}
          </Text>
        </View>
        {data.post_image ? (
          <Image
            source={{uri: data.post_image}}
            style={{width: '100%', height: 300, resizeMode: 'cover'}}
          />
        ) : (
          <View style={s.preview_image}></View>
        )}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: 30,
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 40,
          }}>
          <MaterialIcons
            name="photo-camera"
            color="rgb(91, 132, 255)"
            size={30}
            onPress={take_photo}
          />
          <MaterialIcons
            name="insert-photo"
            color="rgb(91, 132, 255)"
            size={30}
            onPress={chooseFromGallery}
          />
          {data.post_image ? (
            <MaterialIcons
              onPress={() => setdata({...data, post_image: ''})}
              name="delete"
              color="rgb(255, 91, 91)"
              size={30}
            />
          ) : null}
        </View>

        <View>
          <TouchableOpacity
            style={s.CreateDoorButtons}
            onPress={submittingData}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.CreateDoorButtons, {backgroundColor: 'rgb(76, 86, 170)'}]}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditPost;

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  CreateDoorButtons: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(91, 132, 255)',
    borderRadius: 3,
  },
  preview_image: {
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgb(190,190,190)',
    borderStyle: 'dashed',
    borderRadius: 3,
  },
  inputStyle: {
    backgroundColor: 'white',
    marginVertical: 3,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 3,
    backgroundColor: 'rgb(240,240,240)',
    marginBottom: 10,
  },
});
