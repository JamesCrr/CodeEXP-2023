const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

var admin = require("firebase-admin");

var serviceAccount = require("./servicekey.json");

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyBpLEaypKRTTzDJyvNVBFTW65qJtSgIdo8",
  authDomain: "code-exp-borrowbuddy.firebaseapp.com",
  databaseURL:
    "https://code-exp-borrowbuddy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "code-exp-borrowbuddy",
  storageBucket: "code-exp-borrowbuddy.appspot.com",
  messagingSenderId: "952131407797",
  appId: "1:952131407797:web:a52fd81aed2aa49ef2d3fc",
  measurementId: "G-BHTXRF3ND9",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
