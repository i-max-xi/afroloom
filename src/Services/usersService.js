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
const ordersCollectionRef = collection(db, "afroloomOrders");
const userCollectionRef = collection(db, "users");
const fabricsCollectionRef = collection(db, "fabrics");
const contactDetailsCollectionRef = collection(db, "contactDetails");

class AllServices {
  //orders
  getAllOrders = () => {
    return getDocs(ordersCollectionRef);
  };
  addOrder = (newOrder) => {
    return addDoc(ordersCollectionRef, newOrder);
  };

  // user
  getuserByField = async (fieldName, value) => {
    const q = query(userCollectionRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]; // Assuming there's at most one document with the given "id"
  };

  // partner
  getAllPartners = () => {
    return getDocs(partnersCollectionRef);
  };
  addPartner = (newPartner) => {
    return addDoc(partnersCollectionRef, newPartner);
  };

  getPartnerByField = async (fieldName, value) => {
    try {
      const q = query(partnersCollectionRef, where(fieldName, "==", value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0];
    } catch (error) {
      console.error(`Error fetching Partner: ${error}`);
      return error;
    }
  };

  updatePartner = async (id, updatedPartner) => {
    try {
      const PartnerDoc = await this.getPartnerByField("id", id);
      console.log(updatedPartner);

      if (PartnerDoc) {
        await updateDoc(PartnerDoc.ref, updatedPartner);
        return "Partner updated successfully.";
      } else {
        return `Partner with id ${id} not found.`;
      }
    } catch (error) {
      console.error(`Error updating Partner: ${error}`);
      return error;
    }
  };

  // fabrics
  getAllFabrics = async () => {
    const fabrics = await getDocs(fabricsCollectionRef);
    return fabrics;
  };
  addFabric = (newFabric) => {
    return addDoc(fabricsCollectionRef, newFabric);
  };

  getFabricByField = async (fieldName, value) => {
    try {
      const q = query(fabricsCollectionRef, where(fieldName, "==", value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0];
    } catch (error) {
      console.error(`Error fetching Fabric: ${error}`);
      return error;
    }
  };

  updateFabric = async (id, updatedFabric) => {
    try {
      const FabricDoc = doc(db, "fabrics", id);
      await updateDoc(FabricDoc, updatedFabric);
      return "Fabric updated successfully.";
    } catch (error) {
      console.error(`Error updating Fabric: ${error}`);
      return error;
    }
  };

  // contact details
  getAllcontactDetails = async () => {
    const contactDetails = await getDocs(contactDetailsCollectionRef);
    return contactDetails;
  };
  addcontactDetail = (newcontactDetail) => {
    return addDoc(contactDetailsCollectionRef, newcontactDetail);
  };

  getcontactDetailByField = async (fieldName, value) => {
    try {
      const q = query(
        contactDetailsCollectionRef,
        where(fieldName, "==", value),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0];
    } catch (error) {
      console.error(`Error fetching contactDetail: ${error}`);
      return error;
    }
  };

  updatecontactDetail = async (id, updatedcontactDetail) => {
    try {
      const contactDetailDoc = doc(db, "contactDetails", id);
      await updateDoc(contactDetailDoc, updatedcontactDetail);
      return "contactDetail updated successfully.";
    } catch (error) {
      console.error(`Error updating contactDetail: ${error}`);
      return error;
    }
  };
}

export default new AllServices();
