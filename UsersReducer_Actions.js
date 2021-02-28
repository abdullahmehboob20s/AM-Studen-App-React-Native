import firestore from "@react-native-firebase/firestore"

export const get_users = (data) => async (dispatch) => {
        firestore()
        .collection('users')
        .onSnapshot(
          (querySanpshot) => {
            const docs = [];
            querySanpshot.forEach((doc) => {
              docs.push({...doc.data(), id: doc.id});
            });
            if (docs) {
                dispatch({
                    type: 'GET_USERS',
                    payload: docs,
                  });
            }
          },
          (err) => console.log(err),
        );
};

