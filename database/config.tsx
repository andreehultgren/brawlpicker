// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Database, getDatabase } from "firebase/database";
import { FirebaseStorage, getStorage } from "firebase/storage";

// Set up config
const firebaseConfig = {
  apiKey: "AIzaSyDUdOO5JO0f9vqNybPYF4Y02WWDT7FFFww",
  authDomain: "brawlpicker.firebaseapp.com",
  projectId: "brawlpicker",
  storageBucket: "brawlpicker.appspot.com",
  messagingSenderId: "297588796909",
  appId: "1:297588796909:web:cbafad30f757dfbafb4be4",
  measurementId: "G-H3GL33KDE0",
  databaseURL:
    "https://brawlpicker-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize app
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

// Set up google analytics
let analytics: Analytics;

if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Set up storage
const storage: FirebaseStorage = getStorage();

export { app, database, analytics, storage };
