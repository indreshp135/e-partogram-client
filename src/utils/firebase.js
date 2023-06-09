import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getMessaging, onMessage } from 'firebase/messaging';
import {
  appCheckDebugToken, firebaseConfig, recaptchaSiteKey, useLocalEmulator
} from '../config';

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line no-restricted-globals
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckDebugToken;
}

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(recaptchaSiteKey),
  isTokenAutoRefreshEnabled: true
});

const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

if (useLocalEmulator) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectDatabaseEmulator(db, 'localhost', 9009);
  connectFirestoreEmulator(firestore, 'localhost', 8088);
  connectStorageEmulator(storage, 'localhost', 9199);
}

onMessage(messaging, () => {
//   console.log('Message received. ', payload);
});

export {
  auth, app, appCheck, db, firestore, storage, messaging
};
