// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setProducts } from "../actions"; // Assuming you have an action to set products in Redux
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { addProducts } from "../Redux/store";

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const db = firebase.firestore();
//       const productsRef = db.collection("AllProducts");

//       try {
//         const snapshot = await productsRef.get();

//         const products = snapshot.docs.map((doc) => {
//           return { id: doc.id, ...doc.data() };
//         });
//         console.log(products)

//         dispatch(addProducts(products));
//       } catch (error) {
//         // Handle error
//         console.log("Error fetching products: ", error);
//       }
//     };

//     fetchProducts();
//   }, []);


import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});



