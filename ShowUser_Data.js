import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Communications from 'react-native-communications';

const ShowUser_Data = ({navigation, route}) => {
  let [data, setData] = useState('');
  const UsersReducer = useSelector((state) => state.UsersReducer);
  let {id} = route.params;

  useEffect(() => {
    let d =
      UsersReducer.users.find == undefined
        ? ''
        : UsersReducer.users.find((user) => user.uid == id);
    setData(d);
  }, [id]);

  let sendMail = (email) => {
    Communications.email([email], null, null, 'Subject : ', 'body :');
  };
  let contact = (number) => {
    Communications.phonecall(number, true);
  };

  return data ? (
    <ScrollView>
      <View style={s.container}>
        <View style={s.todos}>
          <View style={s.todoImage}>
            {data.photoURL ? (
              <Image
                source={{uri: data.photoURL}}
                style={{width: 100, height: 100}}
              />
            ) : (
              <FontAwesome5 name="user-circle" size={85} color="grey" />
            )}

            <View>
              <TouchableOpacity
                onPress={() => sendMail(data.email)}
                style={s.updatingPhoto}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#034f84',
                    fontWeight: 'bold',
                  }}>
                  Send Mail
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => contact(data.phoneNumber)}
                style={s.updatingPhoto}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#034f84',
                    fontWeight: 'bold',
                  }}>
                  Contact Him
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.todo}>
            <Text
              style={{
                color: '#404040',
                textTransform: 'capitalize',
                width: 250,
              }}>
              {data.displayName}
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
              {data.email}
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
              {data.school}
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
              {data.age}
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
              {data.phoneNumber}
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
              {data.hobbies}
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
              {data.skills}
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
              {data.aboutYourSelf}
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
              {data.city}
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
              {data.district}
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

export default ShowUser_Data;

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
