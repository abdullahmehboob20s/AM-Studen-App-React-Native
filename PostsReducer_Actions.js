import firestore from '@react-native-firebase/firestore';

export let load_posts = () => async (dispatch) => {
  firestore()
    .collection('posts')
    .onSnapshot(
      (querySanpshot) => {
        const docs = [];
        querySanpshot.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id});
        });
        if (docs) {
          console.log(docs);
          dispatch({
            type: 'LOAD_POSTS',
            payload: docs,
          });
        }
      },
      (err) => console.log(err),
    );
};
