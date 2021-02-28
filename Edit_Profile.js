import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update_profile} from '../redux/actions/AuthReducer_Actions';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Edit_Profile = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [data, setdata] = useState({});

  let submittingData = () => {
    dispatch(update_profile(data.uid, data));
    navigation.goBack();
  };

  useEffect(() => {
    setdata(AuthReducer.user);
  }, [AuthReducer.user]);

  return (
    <ScrollView>
      <View style={s.container}>
        <View
          style={{
            backgroundColor: '#66ccff',
            paddingVertical: 10,
            borderRadius: 4,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 21,
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}>
            Update Profile
          </Text>
        </View>
        <View style={s.formContainer}>
          {error ? (
            <View style={s.errorMessage}>
              <Text style={{color: '#ff3333'}}>{error}</Text>
              {/* <Entypo
                name="squared-cross"
                size={24}
                color="#ff3333"
                onPress={() => setError('')}
              /> */}
            </View>
          ) : null}
          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={s.inputStyle}
            value={data ? data.displayName : 'null'}
            onChangeText={(e) => setdata({...data, displayName: e})}
            placeholder="Edit Your Name"
          />
          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={s.inputStyle}
            value={data ? data.school : 'null'}
            onChangeText={(e) => setdata({...data, school: e})}
            placeholder="Edit your School / Collage"
          />
          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={s.inputStyle}
            value={data ? data.age : 'null'}
            onChangeText={(e) => setdata({...data, age: e})}
            placeholder="Edit Your Age"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.phoneNumber : 'null'}
            onChangeText={(e) => setdata({...data, phoneNumber: e})}
            placeholder="Edit Your Phone Number"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.city : 'null'}
            onChangeText={(e) => setdata({...data, city: e})}
            placeholder="Edit Your City"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.district : 'null'}
            onChangeText={(e) => setdata({...data, district: e})}
            placeholder="Edit Your district"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.address : 'null'}
            onChangeText={(e) => setdata({...data, address: e})}
            placeholder="Edit Your address"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.hobbies : 'null'}
            onChangeText={(e) => setdata({...data, hobbies: e})}
            placeholder="Edit Your hobbies"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.aboutYourSelf : 'null'}
            onChangeText={(e) => setdata({...data, aboutYourSelf: e})}
            placeholder="Edit Your aboutYourSelf"
          />

          <TextInput
            onSubmitEditing={submittingData}
            returnKeyLabel="Submit"
            style={[s.inputStyle, {width: '100%'}]}
            value={data ? data.skills : 'null'}
            onChangeText={(e) => setdata({...data, skills: e})}
            placeholder="Edit Your skills"
          />

          <TouchableOpacity
            style={s.CreateDoorButtons}
            onPress={submittingData}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.CreateDoorButtons, {backgroundColor: '#cc6600'}]}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Edit_Profile;

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d9d9d9',
    height: Dimensions.get('window').height,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  formContainer: {
    width: '100%',
    marginTop: 10,
  },
  inputStyle: {
    backgroundColor: 'white',
    marginVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  picker: {
    marginVertical: 3,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  CreateDoorButtons: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0073e6',
    borderRadius: 3,
  },
  errorMessage: {
    width: '100%',
    minHeight: 50,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ff3333',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 3,
  },
});
