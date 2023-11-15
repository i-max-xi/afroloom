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

class ProductsDataService {
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
  updateBuyerOrders = async (buyerId, updatedOrders) => {
    const buyerDoc = await this.getBuyerByField("id", buyerId); 
    const buyerRef = doc(buyerCollectionRef, buyerDoc.id);
    const currentBuyerData = buyerDoc.data();

    // Assuming orders are stored within the buyer document under a field named "orders"
    const updatedBuyerData = {
      ...currentBuyerData,
      orders: [...currentBuyerData.orders, ...updatedOrders], // Merge updated orders with existing orders
    };

    await updateDoc(buyerRef, updatedBuyerData); // Update buyer document with updated orders
  };
}

export default new ProductsDataService();
