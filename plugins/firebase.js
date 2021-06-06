import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyAOKkeXB5Wb4_j86rSsRsa52rWajSq02pQ",
      authDomain: "shere-app.firebaseapp.com",
      projectId: "shere-app",
      storageBucket: "shere-app.appspot.com",
      messagingSenderId: "369501898123",
      appId: "1:369501898123:web:fec990c36a3b0d88801b8e",
      measurementId: "G-N8BJP0FERK"
    }
  )
}
  
export default firebase