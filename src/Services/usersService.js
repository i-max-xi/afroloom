/* eslint-disable import/no-anonymous-default-export */

import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

const partnersCollectionRef = collection(db, "partners");


class AllServices {
   
    getAllPartners = () => {
      return getDocs(partnersCollectionRef);
    };
    addPartner = (newPartner) => {
      return addDoc(partnersCollectionRef, newPartner);
    };

    getPartnerByField = async (fieldName, value) => {
        const q = query(partnersCollectionRef, where(fieldName, "==", value));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0]; // Assuming there's at most one document with the given "id"
      };

}


export default new AllServices();

