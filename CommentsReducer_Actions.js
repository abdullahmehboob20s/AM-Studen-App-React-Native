import firestore from '@react-native-firebase/firestore';

export const load_comments = () => async (dispatch) => {
  firestore()
    .collection('comments')
    .onSnapshot(
      (querySanpshot) => {
        const docs = [];
        querySanpshot.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id});
        });
        if (docs) {
          dispatch({
            type: 'LOAD_COMMENTS',
            payload: docs,
          });
        }
      },
      (err) => console.log(err),
    );
};
