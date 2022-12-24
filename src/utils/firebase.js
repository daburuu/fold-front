import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    getDoc,
    collection,
    where,
    addDoc
} from "firebase/firestore";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAGAg0hM0jMZPk1Q5TDGr-KafmomjRK5o",
  authDomain: "foldlab-70e0d.firebaseapp.com",
  projectId: "foldlab-70e0d",
  storageBucket: "foldlab-70e0d.appspot.com",
  messagingSenderId: "540498952866",
  appId: "1:540498952866:web:cf3abe2670bf2e93c5cdfb",
  measurementId: "G-Y9Z2L668J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const login = await signInWithEmailAndPassword(auth, email, password);
    return ({error: null, datas: login});
  } catch (err) {
    alert(err.message);
    return ({error: "User not found.", datas: null})
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
      const wallet = ethers.Wallet.createRandom();
      const phrase = wallet.mnemonic.phrase;
      const address = wallet.address;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const register = await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          phrase: phrase,
          address: address
      });
      return ({error: null, datas: register});
  } catch (err) {
    console.log(err.message);
    return ({error: "Can't register", datas: null})
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getAddressByEmail = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const docs = await getDocs(q);
  return docs;
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getAddressByEmail
};