import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Sign_In from '../screens/Sign_In';
import Sign_Up from '../screens/Sign_Up';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {sign_in} from '../redux/actions/AuthReducer_Actions';
import {get_users} from '../redux/actions/UsersReducer_Actions';
import HomeHeader from '../navigation_headers/HomeHeader';
import ShowProfile from '../screens/ShowProfile';
import YourInfo from '../screens/YourInfo';
import Edit_Profile from '../screens/Edit_Profile';
import Create_Post from '../screens/Create_Post';
import {load_posts} from '../redux/actions/PostsReducer_Actions';
import EditPost from '../screens/EditPost';
import Comments from '../screens/Comments';
import ShowUser_Data from '../screens/ShowUser_Data';
let Stack = createStackNavigator();

const MainNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const UsersReducer = useSelector((state) => state.UsersReducer);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    dispatch(sign_in(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    dispatch(get_users());
    dispatch(load_posts());
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator color="red" size={30} />
      </View>
    );
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={`Sign_In`}>
          <Stack.Screen
            name="Sign_In"
            options={{headerShown: false}}
            component={Sign_In}
          />
          <Stack.Screen
            name="Sign_Up"
            options={{headerShown: false}}
            component={Sign_Up}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={`Home`}>
        <Stack.Screen
          options={{header: (props) => <HomeHeader {...props} />}}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="ShowProfile" component={ShowProfile} />
        <Stack.Screen name="YourInfo" component={YourInfo} />
        <Stack.Screen name="Edit_Profile" component={Edit_Profile} />
        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="Create_Post" component={Create_Post} />
        <Stack.Screen name="Comments" component={Comments} />
        <Stack.Screen name="ShowUser_Data" component={ShowUser_Data} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
