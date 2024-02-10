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

const productCollectionRef = collection(db, "AllProducts");
const sellerCollectionRef = collection(db, "sellers");
const buyerCollectionRef = collection(db, "users");
const deliveryServicesRef = collection(db, "deliveryServices");
const modelsRef = collection(db, "models");
const photographerRef = collection(db, "photographer");
const tourGuideRef = collection(db, "tourGuide");

class ProductsDataService {

  // Professionals

  // Models
  getAllModels = () => {
    return getDocs(modelsRef);
  }; 
  addModel = (newModel) => {
    return addDoc(modelsRef, newModel);
  };

  getModel = (id) => {
    const buyerDoc = doc(db, "models", id);
    return getDoc(buyerDoc);
  };

  getModelByField = async (fieldName, value) => {
    const q = query(modelsRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  };

  // updateModel = (id, updatedInfo) => {
  //   const userDoc = doc(db, "models", id);
  //   return updateDoc(userDoc, updatedInfo);
  // };

  updateModel = async (idValue, updatedInfo) => {
    const q = query(modelsRef, where("id", "==", idValue));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      throw new Error("Document not found"); // Handle the case when the document with the specified idValue is not found.
    }

    const docRef = querySnapshot.docs[0].ref;
    return updateDoc(docRef, updatedInfo);
  };
  


  // Tour Guide
  getAllTourGuides = () => {
    return getDocs(tourGuideRef);
  };

  addTourGuide = (newTourGuide) => {
    return addDoc(tourGuideRef, newTourGuide);
  };

  getTourGuide = (id) => {
    const tourGuideDoc = doc(db, "tourGuide", id);
    return getDoc(tourGuideDoc);
  };

  getTourGuideByField = async (fieldName, value) => {
    const q = query(tourGuideRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  };

  // updateTourGuide = (id, updatedInfo) => {
  //   const userDoc = doc(db, "tourGuide", id);
  //   return updateDoc(userDoc, updatedInfo);
  // };

  updateTourGuide = async (idValue, updatedInfo) => {
    const q = query(tourGuideRef, where("id", "==", idValue));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      throw new Error("Document not found"); // Handle the case when the document with the specified idValue is not found.
    }

    const docRef = querySnapshot.docs[0].ref;
    return updateDoc(docRef, updatedInfo);
  };

  // Photographer / Videographer
  getAllPhotographers = () => {
    return getDocs(photographerRef);
  };

  addPhotographer = (newPhotographer) => {
    return addDoc(photographerRef, newPhotographer);
  };

  getPhotographer = (id) => {
    const photographerDoc = doc(db, "photographer", id);
    return getDoc(photographerDoc);
  };

  getPhotographerByField = async (fieldName, value) => {
    const q = query(photographerRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  };

  // updatePhotographer = (id, updatedInfo) => {
  //   const userDoc = doc(db, "photographer", id);
  //   return updateDoc(userDoc, updatedInfo);
  // };

  updatePhotographer = async (idValue, updatedInfo) => {
    const q = query(photographerRef, where("id", "==", idValue));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      throw new Error("Document not found"); // Handle the case when the document with the specified idValue is not found.
    }

    const docRef = querySnapshot.docs[0].ref;
    return updateDoc(docRef, updatedInfo);
  };



  // Products
  addProduct = (newProduct) => {
    return addDoc(productCollectionRef, newProduct);
  };

  updateProduct = (id, updatedProduct) => {
    const productDoc = doc(db, "AllProducts", id);
    return updateDoc(productDoc, updatedProduct);
  };

  deleteProduct = (id) => {
    const productDoc = doc(db, "AllProducts", id);
    return deleteDoc(productDoc);
  };

  deleteProducts = async (productIds) => {
    try {
      const deletionPromises = productIds.map(async (productId) => {
        const productDoc = doc(db, "AllProducts", productId);
        await deleteDoc(productDoc);
      });

      await Promise.all(deletionPromises);
      return true; // Indicate successful deletion
    } catch (error) {
      console.error("Error deleting products from AllProducts:", error);
      return false; // Indicate failure in deletion
    }
  };

  getAllProducts = () => {
    return getDocs(productCollectionRef);
  };

  getProduct = (id) => {
    const productDoc = doc(db, "AllProducts", id);
    return getDoc(productDoc);
  };

  getProductByField = async (fieldName, value) => {
    const q = query(productCollectionRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

  // sellers
  getAllSellers = () => {
    return getDocs(sellerCollectionRef);
  };
  getSeller = (id) => {
    const sellerDoc = doc(db, "sellers", id);
    return getDoc(sellerDoc);
  };
  addSeller = (newSeller) => {
    return addDoc(sellerCollectionRef, newSeller);
  };
  deleteSeller = (id) => {
    const sellerDoc = doc(db, "sellers", id);
    return deleteDoc(sellerDoc);
  };

  getSellerByField = async (fieldName, value) => {
    const q = query(sellerCollectionRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]; // Assuming there's at most one document with the given "id"
  };

  updateSellerApproval = async (sellerId, approvedStatus) => {
    try {
      const sellerDocRef = doc(db, "sellers", sellerId);
      await updateDoc(sellerDocRef, { approved: approvedStatus });
      return true; // Indicate successful update
    } catch (error) {
      console.error("Error updating seller approval status:", error);
      return false; // Indicate failure in updating
    }
  };



  // user
  getBuyer = (id) => {
    const buyerDoc = doc(db, "users", id);
    return getDoc(buyerDoc);
  };
  addBuyer = (newBuyer) => {
    return addDoc(buyerCollectionRef, newBuyer);
  };
  getBuyerByField = async (fieldName, value) => {
    const q = query(buyerCollectionRef, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]; // Assuming there's at most one document with the given "id"
  };

  updateUserOrders = async (userId, updatedOrders) => {
    try {
      const user = await this.getBuyerByField("id", userId);
  
      if (user) {
        const userDocRef = doc(db, "users", user.id);
        await updateDoc(userDocRef, { orders: updatedOrders });
        return true; // Indicate successful update
      } else {
        throw new Error("User document not found");
      }
    } catch (error) {
      console.error("Error updating user orders:", error);
      return false; // Indicate failure in updating
    }
  };
  


  // Delivery Service
  addDelivery = (newProduct) => {
    return addDoc(deliveryServicesRef, newProduct);
  };
  updateDelivery = (id, updatedProduct) => {
    const productDoc = doc(db, "deliveryServices", id);
    return updateDoc(productDoc, updatedProduct);
  };

  deleteDelivery = (id) => {
    const productDoc = doc(db, "deliveryServices", id);
    return deleteDoc(productDoc);
  };

  getAllDelivery= () => {
    return getDocs(deliveryServicesRef);
  };
}

export default new ProductsDataService();
