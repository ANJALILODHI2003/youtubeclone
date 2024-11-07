import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDUJiJJg0OPNFI-UF_oMUF3dnpGvfC98xs",
    authDomain: "first-clon.firebaseapp.com",
    projectId: "first-clon",
    storageBucket: "first-clon.appspot.com",
    messagingSenderId: "747019166267",
    appId: "1:747019166267:web:9d84104ee451e7d6d8b21e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
