import firebaseApp from "./firebase-config";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default firestore;
