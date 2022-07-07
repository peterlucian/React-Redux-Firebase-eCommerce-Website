import { auth } from './../../firebase/utils';
import { firestore } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  };

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['Email not found. Please try again.'];
        reject(err);
      });
  });
};

export const handleUpdateAddress = (address, userUID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('users')
      .doc(userUID)
      .update({ address })
      .then(() => {
        console.log('Documento sucesso');
        resolve();
      })
      .catch(err => {
        console.log(address);
        reject(err);
      })
  });
}

export const handleFetchAddress = (userUID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('users')
      .doc(userUID)
      .get()
      .then((doc) => {
        const data = doc.data();
        const addressData = data.address;
        resolve({
          ...addressData
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}