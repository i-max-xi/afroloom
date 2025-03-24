// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { generateSearchKeywords } from "./functions";
// import { db } from "../firebase";

// export const updateAllProductsWithKeywords = async () => {
//     const db_id = "loomStore"
//   const shopCollectionRef = collection(db, db_id);
// //   const shopCollectionRef = collection(db, "loomStore");

//   try {
//     const snapshot = await getDocs(shopCollectionRef);
    
//     snapshot.forEach(async (docSnapshot) => {
//       const productData = docSnapshot.data();
//       if (!productData.name) return; // Skip if there's no name field

//       const searchKeywordsFromName = generateSearchKeywords(productData.name);
//       const searchKeywordsFromParentCategory = generateSearchKeywords(productData.parent_category);
//       const searchKeywordsFromCHildCategory = generateSearchKeywords(productData.child_category);

//       const searchKeywords = [
//         ...searchKeywordsFromName,
//         ...searchKeywordsFromParentCategory,
//         ...searchKeywordsFromCHildCategory,
//     ];

//       // Update Firestore document
//       const productRef = doc(db, db_id, docSnapshot.id);
//       await updateDoc(productRef, { search_keywords: searchKeywords });

//       console.log(`Updated: ${productData.name}`);
//     });

//     console.log("All products updated successfully.");
//   } catch (error) {
//     console.error("Error updating products:", error);
//   }
// };

