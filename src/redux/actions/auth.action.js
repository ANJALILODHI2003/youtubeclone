import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase'; // Import app instance from your Firebase setup
import {
   LOAD_PROFILE,
   LOGIN_FAIL,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOG_OUT,
} from '../actionType';

// Initialize Firebase Auth
const auth = getAuth(app);

export const login = () => async dispatch => {
   try {
      dispatch({
         type: LOGIN_REQUEST,
      });

      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

      const result = await signInWithPopup(auth, provider);
      const accessToken = result._tokenResponse.oauthAccessToken;

      const profile = {
         name: result.user.displayName,
         photoURL: result.user.photoURL,
      };

      sessionStorage.setItem('ytc-access-token', accessToken);
      sessionStorage.setItem('ytc-user', JSON.stringify(profile));

      dispatch({
         type: LOGIN_SUCCESS,
         payload: accessToken,
      });
      dispatch({
         type: LOAD_PROFILE,
         payload: profile,
      });
   } catch (error) {
      console.log(error.message);
      dispatch({
         type: LOGIN_FAIL,
         payload: error.message,
      });
   }
};

export const log_out = () => async dispatch => {
   try {
      await signOut(auth);
      dispatch({
         type: LOG_OUT,
      });

      sessionStorage.removeItem('ytc-access-token');
      sessionStorage.removeItem('ytc-user');
   } catch (error) {
      console.log(error.message);
   }
};
