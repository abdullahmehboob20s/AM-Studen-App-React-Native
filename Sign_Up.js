import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const Sign_Up = ({navigation}) => {
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState({
    email: '',
    displayName: '',
    photoURL: '',
    age: '',
    school: '',
    phoneNumber: '',
    password: '',
    address: '',
    city: '',
    district: '',
    hobbies: '',
    aboutYourSelf: '',
    skills: '',
    confirmPassword: '',
    uid: '',
  });

  let signUn = async () => {
    try {
      if (
        data.email === '' ||
        data.password === '' ||
        data.confirmPassword === ''
      ) {
        setError('Not All Fields Have Been Entered');
        Keyboard.dismiss();
        return;
      }
      setLoading(true);

      if (data.password !== data.confirmPassword) {
        setError('Passwords Are Not Matching');
        Keyboard.dismiss();
        return;
      }
      let {email, password} = data;
      let userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (userCredential) {
        await firestore().collection('users').doc(userCredential.user.uid).set({
          email: data.email,
          displayName: data.displayName,
          age: data.age,
          phoneNumber: data.phoneNumber,
          school: data.school,
          photoURL: data.photoURL,
          uid: userCredential.user.uid,
          address: '',
          city: '',
          district: '',
          hobbies: '',
          aboutYourSelf: '',
          skills: '',
        });
      }

      setData({
        email: '',
        displayName: '',
        photoURL: '',
        age: '',
        school: '',
        phoneNumber: '',
        password,
        confirmPassword,
      });
      setLoading(false);
      Keyboard.dismiss();
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setError('That email address is already in use!');
        Keyboard.dismiss();
      }
      if (error.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
        Keyboard.dismiss();
      }
      if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters Long');
        Keyboard.dismiss();
      }
      console.log(error);
      Keyboard.dismiss();
    }
  };

  return !loading ? (
    <ScrollView style={{flex: 1}}>
      <View style={s.container}>
        <Image
          source={require('../images/brandLogo.png')}
          style={{
            width: 160,
            height: 160,
            resizeMode: 'cover',
            marginBottom: 40,
            marginTop: 20,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10,
            textTransform: 'capitalize',
            letterSpacing: 1,
            color: '#7a3b2e',
          }}>
          Register
        </Text>
        <View style={s.inputsContainer}>
          {/* full name */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MaterialIcons name="perm-identity" size={30} color="grey" />
            </View>
            <TextInput
              style={s.inputOne}
              onChangeText={(e) => setData({...data, displayName: e})}
              placeholder="Enter Your Full Name"
              autoCorrect={false}
              returnKeyLabel="Sign Up"
              onSubmitEditing={signUn}
            />
          </View>
          {/* full name ends */}

          {/* email */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Fontisto name="email" size={30} color="grey" />
            </View>
            <TextInput
              style={s.inputOne}
              onChangeText={(e) => setData({...data, email: e})}
              keyboardType="email-address"
              placeholder="Enter Your Email"
              autoCorrect={false}
              returnKeyLabel="Sign Up"
              onSubmitEditing={signUn}
            />
          </View>
          {/* email end */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MaterialIcons name="lock-outline" size={30} color="grey" />
            </View>
            <TextInput
              style={s.inputTwo}
              onChangeText={(e) => setData({...data, password: e})}
              placeholder="Create Your Password"
              secureTextEntry={true}
              onSubmitEditing={signUn}
              returnKeyLabel="Sign Up"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              backgroundColor: '#f2f2f2',
            }}>
            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MaterialIcons name="lock-outline" size={30} color="grey" />
            </View>
            <TextInput
              style={s.inputTwo}
              onChangeText={(e) => setData({...data, confirmPassword: e})}
              secureTextEntry={true}
              placeholder="Cofirm Your Password"
              autoCorrect={false}
              onSubmitEditing={signUn}
              returnKeyLabel="Sign Up"
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6} style={s.button} onPress={signUn}>
          <Text style={{color: 'white'}}>Sign Up</Text>
        </TouchableOpacity>
        <View style={[s.errorContaner, {display: error ? 'flex' : 'none'}]}>
          <Text style={{color: '#bc5a45', width: 240}}>{error}</Text>
          <Entypo
            name="cross"
            onPress={() => setError('')}
            color="#bc5a45"
            size={23}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={s.gotoSignUp}
            onPress={() => navigation.navigate('Sign_In')}>
            <Text style={{color: '#a6a6a6'}}>
              Already Have An Account ! Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={35} color="#004d99" />
    </View>
  );
};

export default Sign_Up;

const s = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: 'rgb(210,210,210)',
    padding: 20,
  },

  errorContaner: {
    marginTop: 2,
    paddingHorizontal: 20,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bc5a45',
    marginTop: 20,
    borderRadius: 3,
  },
  inputsContainer: {
    width: '100%',
    marginTop: 30,
  },
  inputOne: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
  inputTwo: {
    paddingLeft: 20,
    backgroundColor: 'white',
    // backgroundColor: '#f2f2f2',
    flex: 1,
    height: '100%',
  },
  button: {
    backgroundColor: '#4d94ff',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 3,
    elevation: 3,
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#6ea3f7',
    height: 45,
    borderRadius: 3,
    justifyContent: 'center',
    marginBottom: 10,
  },
  gotoSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#bfbfbf',
    height: 45,
    borderRadius: 3,
    justifyContent: 'center',
    marginTop: 5,
  },
});
