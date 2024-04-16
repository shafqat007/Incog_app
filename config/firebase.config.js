import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyDo1joTsfKgjZk3SUg3QlfMPQOUQ2rn4t8",
    authDomain: "ultimatechattinapp.firebaseapp.com",
    projectId: "ultimatechattinapp",
    storageBucket: "ultimatechattinapp.appspot.com",
    messagingSenderId: "364128450179",
    appId: "1:364128450179:web:97101070eacc8350f18db6"
  };

  const app = getApps.lenght>0?getApp():initializeApp(firebaseConfig)
  const firebaseAuth = getAuth(app)
  const firestoreDB = getFirestore(app)

  export {app,firebaseAuth,firestoreDB}