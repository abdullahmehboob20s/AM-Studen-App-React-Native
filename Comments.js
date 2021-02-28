import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react/cjs/react.development';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Comments = (props) => {
  const CommentsReducer = useSelector((state) => state.CommentsReducer);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const UsersReducer = useSelector((state) => state.UsersReducer);
  let [comments, setComments] = useState([]);
  let [message, setMessage] = useState('');
  let {id} = props.route.params;
  let [data, setData] = useState({
    name: '',
    url: '',
  });

  useEffect(() => {
    setComments(CommentsReducer.comments.filter((item) => item.post_id == id));
  }, [id, message]);

  let sendingMessage = async () => {
    try {
      if (message == '') {
        console.log('not Message');
        return;
      }

      let data = {
        comment: message,
        post_id: id,
        user_id: AuthReducer.user.uid,
      };

      await firestore().collection('comments').doc().set(data);
      setMessage('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={s.container}>
      <View style={s.message_View}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={({item}) => (
            <View style={s.message}>
              <View>
                {UsersReducer.users.find((user) => user.uid == item.user_id)
                  .photoURL === '' ? (
                  <FontAwesome5
                    name="user-circle"
                    style={s.comment_image}
                    size={40}
                    color="grey"
                  />
                ) : (
                  <Image
                    style={s.comment_image}
                    source={{
                      uri: UsersReducer.users.find(
                        (user) => user.uid == item.user_id,
                      ).photoURL,
                    }}
                  />
                )}
              </View>
              <Text style={s.message_name}>
                {UsersReducer.users.find((user) => user.uid == item.user_id)
                  ? UsersReducer.users.find((user) => user.uid == item.user_id)
                      .displayName
                  : 'null'}
              </Text>
              <Text style={{color: 'white', width: '100%'}}>
                {item.comment}{' '}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={s.Input_messsage}>
        <TextInput
          value={message}
          returnKeyLabel="Send"
          onChangeText={(e) => setMessage(e)}
          onSubmitEditing={sendingMessage}
          style={s.Input_messsage_Input}
          placeholder="Enter Your Message"
        />
        <TouchableOpacity style={s.Input_messsage_Button}>
          <Ionicons
            name="send"
            size={25}
            color="white"
            onPress={sendingMessage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  comment_image: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    position: 'absolute',
    top: -20,
    left: -70,
  },
  displayName: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 3,
    width: '100%',
  },
  message_View: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  Input_messsage: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
  },
  Input_messsage_Input: {
    flex: 1,
    paddingLeft: 25,
  },
  Input_messsage_Button: {
    width: 70,
    backgroundColor: '#66ccff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    minHeight: 65,
    backgroundColor: '#b3b3b3',
    borderRadius: 5,
    marginLeft: 50,
    position: 'relative',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingBottom: 15,
    marginVertical: 5,
  },
  message_image: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 0,
    left: -40,
    borderRadius: 35 / 2,
  },
  message_name: {
    color: '#666666',
    position: 'absolute',
    top: 5,
    left: 20,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
