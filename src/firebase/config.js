import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKGb9C6djpcKJAWhDLMhVR0JnW0A3qw4o",
  authDomain: "final-project-mobile-instagram.firebaseapp.com",
  projectId: "final-project-mobile-instagram",
  storageBucket: "final-project-mobile-instagram.appspot.com",
  messagingSenderId: "585027564372",
  appId: "1:585027564372:web:5716672f22c9d271088ec1",
  measurementId: "G-R6RF3RMZTF",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();

export { db };
export default firebase;
