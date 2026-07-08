// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { db } from '../firebase';

// export const updateAllProductsWithGrandparentCategory = async () => {
//   const db_id = 'loomStore';
//   const shopCollectionRef = collection(db, db_id);

//   try {
//     const snapshot = await getDocs(shopCollectionRef);

//     snapshot.forEach(async (docSnapshot) => {
//       const productData = docSnapshot.data();
//       if (!productData.parent_category) return; // Skip if there's no parent_category field

//       let grandparent_category = '';

//       if (
//         [
//           "Women's Clothing",
//           "Men's Clothing",
//           'Unisex',
//           'Accessories',
//         ].includes(productData.parent_category)
//       ) {
//         grandparent_category = 'ready to wear';
//       } else if (productData.parent_category === 'Style & Sew') {
//         grandparent_category = 'order to sew';
//       } else {
//         return; // Skip updating if no matching condition
//       }

//       // Update Firestore document
//       const productRef = doc(db, db_id, docSnapshot.id);
//       await updateDoc(productRef, { grandparent_category });

//       console.log(
//         `Updated: ${productData.name} with grandparent_category: ${grandparent_category}`,
//       );
//     });

//     console.log('All applicable products updated successfully.');
//   } catch (error) {
//     console.error('Error updating products:', error);
//   }
// };
