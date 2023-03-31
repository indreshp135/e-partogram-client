importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBOcElEQFmx2npCRiU0RDb7MX-7W6DCgQs",
  authDomain: "e-partogram.firebaseapp.com",
  databaseURL:
    "https://e-partogram-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-partogram",
  storageBucket: "e-partogram.appspot.com",
  messagingSenderId: "577945199184",
  appId: "1:577945199184:web:cef54b9ae74b36a2ea6755",
  measurementId: "G-VDM4SM8L70",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
