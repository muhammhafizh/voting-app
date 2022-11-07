import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPoXzjPZkK6YnN3qVQ6LOLHad4B2hxkI4",
  authDomain: "mini-project-f297c.firebaseapp.com",
  projectId: "mini-project-f297c",
  storageBucket: "mini-project-f297c.appspot.com",
  messagingSenderId: "384040453241",
  appId: "1:384040453241:web:3ab381d1974c64b15980a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
