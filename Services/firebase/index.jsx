import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  increment,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const firebaseConfig = JSON.parse(String(process.env.REACT_APP_FIREBASE_CONFIG));

const appMain = initializeApp(firebaseConfig);
const dbMain = getFirestore(appMain);
const dbAuth = getAuth();
const dbStorage = getStorage();

const currentUserMain = dbAuth.currentUser;

const sendPasswordResetEmailMain = async (email) => {
  try {
    await sendPasswordResetEmail(dbAuth, email);
    return {
      success: true,
      info: 'Correo enviado',
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};
const observerAuth = (funct) => {
  onAuthStateChanged(dbAuth, funct);
};

const signOutMain = async () => {
  const result = await signOut(dbAuth);
  return result;
};

const getAuthMain = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(dbAuth, email, password);
  return userCredential;
};

const updatePasswordMain = async (user, password) => updatePassword(user, password);

const getListWhereMain = async (path, whereObjec = {}, limitDB) => {
  try {
    const whereQuery = limitDB
      ? query(collection(dbMain, path), where(whereObjec?.key, whereObjec?.operator, whereObjec?.value), limit(limitDB))
      : query(collection(dbMain, path), where(whereObjec?.key, whereObjec?.operator, whereObjec?.value));
    const collectionDB = await getDocs(whereQuery);
    return {
      success: true,
      info: collectionDB.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })),
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const getListWhereTwoMain = async (path, whereObjec = {}, whereObjecTwo = {}, limitDB) => {
  try {
    const whereQuery = limitDB
      ? query(
          collection(dbMain, path),
          where(whereObjec?.key, whereObjec?.operator, whereObjec?.value),
          where(whereObjecTwo?.key, whereObjecTwo?.operator, whereObjecTwo?.value),
          limit(limitDB)
        )
      : query(
          collection(dbMain, path),
          where(whereObjec?.key, whereObjec?.operator, whereObjec?.value),
          where(whereObjecTwo?.key, whereObjecTwo?.operator, whereObjecTwo?.value)
        );
    const collectionDB = await getDocs(whereQuery);
    return {
      success: true,
      info: collectionDB.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })),
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const getCollectionMain = async (path) => {
  try {
    const collectionDB = await getDocs(collection(dbMain, path));
    return {
      success: true,
      info: collectionDB.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      })),
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const getDocMain = async (collectionName, documentID) => {
  try {
    const docData = await getDoc(doc(dbMain, collectionName, documentID));
    return {
      success: true,
      info: {
        docID: docData.id,
        ...docData.data(),
      },
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const addDocumentMain = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(dbMain, collectionName), data);
    return {
      success: true,
      info: {
        id: docRef.id,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      success: false,
      info: e,
    };
  }
};

const setDocumentMain = async (collectionName, documentID, data) => {
  try {
    await setDoc(doc(dbMain, collectionName, documentID), data);
    return {
      success: true,
      info: 'Se agrego exitosamente',
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const updateDocumentMain = async (collectionName, documentID, data) => {
  try {
    const docRef = await updateDoc(doc(dbMain, collectionName, documentID), data);
    return {
      success: true,
      info: {
        id: docRef,
      },
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const deleteDocumentMain = async (collectionName, documentID) => {
  try {
    await deleteDoc(doc(dbMain, collectionName, documentID));
    return {
      success: true,
      info: 'El documento fue eliminado existosamente',
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const getStorageMain = async (refData) => {
  try {
    const info = await getDownloadURL(ref(dbStorage, refData));
    return {
      success: true,
      info,
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const deleteStorageMain = async (refData) => {
  try {
    await deleteObject(ref(dbStorage, refData));
    return {
      success: true,
      info: 'Documento eliminado',
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const putFile = async (file, refData) => {
  try {
    await uploadBytes(ref(dbStorage, refData), file);
    return {
      success: true,
      info: 'Archivo subido exitosamente',
    };
  } catch (e) {
    return {
      success: false,
      info: e,
    };
  }
};

const incrementMain = (number = 1) => increment(number);

async function getID(path) {
  const db = dbMain;
  try {
    const document = doc(collection(db, path));
    return document.id;
  } catch (e) {
    console.error(e.message);
    return {
      failed: true,
      message: e.message,
    };
  }
}

const getToken = async () => {
  const dataToken = await dbAuth.currentUser?.getIdTokenResult();
  return dataToken?.token;
};

export {
  getID,
  getCollectionMain,
  observerAuth,
  currentUserMain,
  dbAuth,
  incrementMain,
  updatePasswordMain,
  signOutMain,
  getAuthMain,
  getStorageMain,
  addDocumentMain,
  setDocumentMain,
  updateDocumentMain,
  deleteDocumentMain,
  getDocMain,
  deleteStorageMain,
  getListWhereMain,
  putFile,
  getListWhereTwoMain,
  sendPasswordResetEmailMain,
  getToken
};
export default null;
