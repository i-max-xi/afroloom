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

  // user
  getBuyer = (id) => {
    const buyerDoc = doc(db, "users", id);
    return getDoc(buyerDoc);
  };
  addBuyer = (newBuyer) => {
    return addDoc(buyerCollectionRef, newBuyer);
  };
}

export default new ProductsDataService();
