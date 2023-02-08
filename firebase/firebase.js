// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFile } from "../utils";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBJfyMXNz1qBU4C1P3gs6872PUFMrdwls",
  authDomain: "bleuwater-b535f.firebaseapp.com",
  projectId: "bleuwater-b535f",
  storageBucket: "bleuwater-b535f.appspot.com",
  messagingSenderId: "612325301415",
  appId: "1:612325301415:web:12bd739b5266a3fa82cf82",
  measurementId: "G-KVYNJ5XLL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// const analytics = getAnalytics(app);

// Initialize Firebase
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const createUserProfile = async (user) => {
  try {
    await setDoc(doc(db, "users", user.account), user);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserProfile = async (account) => {
  const docRef = doc(db, "users", account);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const uploadImage = async ({ account, name, file }) => {
  try {
    const imageRef = ref(storage, `users/${account}/${name}.png`);
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getImage = async ({ account, name }) => {
  try {
    const url = await getDownloadURL(ref(storage, `users/${account}/${name}.png`));
    return await getFile(url);
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async ({ account, name }) => {
  const imageRef = ref(storage, `users/${account}/${name}.png`);
  await deleteObject(imageRef);
};

// collection

export const createCollectionProfile = async (collection) => {
  try {
    await setDoc(doc(db, "collections", collection.id), collection);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCollectionProfile = async (id) => {
  const docRef = doc(db, "collections", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const uploadCollectionImage = async ({ id, name, file }) => {
  try {
    const imageRef = ref(storage, `collections/${id}/${name}.png`);
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCollectionImage = async ({ id, name }) => {
  try {
    const url = await getDownloadURL(ref(storage, `collections/${id}/${name}.png`));
    return await getFile(url);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollectionImage = async ({ id, name }) => {
  const imageRef = ref(storage, `collections/${id}/${name}.png`);
  await deleteObject(imageRef);
};
