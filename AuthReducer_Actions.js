import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const sign_in = (user) => async (dispatch) => {
  // let document = await firestore().collection('users').doc(user.uid).get();

  const subscriber = firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot((documentSnapshot) => {
      dispatch({
        type: 'Sign_IN',
        payload: documentSnapshot.data(),
      });
    });
};

export const logout_user = () => async (dispatch) => {
  try {
    let logout = await auth().signOut();
    dispatch({
      type: 'LOGOUT_USER',
      payload: 'none',
    });
    console.log(logout);
  } catch (error) {
    console.log(error);
  }
};

export let update_profile = (id, data) => async (dispatch) => {
  try {
    firestore()
      .collection('users')
      .doc(id)
      .update(data)
      .then((d) => {
        console.log('User updated!');
      });
  } catch (error) {
    console.log(error);
  }
};
