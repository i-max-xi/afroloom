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
        return querySnapshot.docs[0];
      };

      updatePartner = async (id, updatedPartner) => {
        try {
          const PartnerDoc = await this.getPartnerByField("id", id);
          console.log(updatedPartner)
          
          if (PartnerDoc) {
            await updateDoc(PartnerDoc.ref, updatedPartner);
            return "Partner updated successfully."
          } else {
            return `Partner with id ${id} not found.`;
          }
        } catch (error) {
          console.error(`Error updating Partner: ${error}`);
          return error;
        }
      };

}


export default new AllServices();

