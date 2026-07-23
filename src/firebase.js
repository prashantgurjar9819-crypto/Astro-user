import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDVCA5pgPKpVIB5sbIyRnmWEZXxXFYe2tw",
  apiKey: "AIzaSyCaNJxu1hfLBaWf96YfI2MaaDwnh8MxJDU",
  authDomain: "kalpjyotish-bd41d.firebaseapp.com",
  projectId: "kalpjyotish-bd41d",
  storageBucket: "kalpjyotish-bd41d.firebasestorage.app",
  messagingSenderId: "5986978124",
  appId: "1:5986978124:web:57f92692e1150c0a82e7e9",
  measurementId: "G-9VVZ8WL3SS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;