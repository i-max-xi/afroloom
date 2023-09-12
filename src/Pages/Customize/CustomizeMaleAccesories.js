// import React, { useEffect } from "react";
// import Nav from "../../Components/Nav";
// import { useParams } from "react-router-dom";
// import { maleAccessoriesExtras } from "../../Data/CustomizeDataAccessories";

// const CustomizeMaleAccesories = () => {
//   const { Id } = useParams();
//   const maleAccessories = maleAccessoriesExtras.filter((c) => c.category === Id);


//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <Nav />
//       <div className="container">
//         <div className="row">
//           {maleAccessories.map(({ items }) =>
//             items.map(({ name, image }) => (
//               <div className="col-3 m-3 mx-3" key={name}>
//                 <div
//                   className="card"
//                   data-aos="fade-in"
//                   data-aos-duration="1500"
//                 >
//                   <img
//                     className="card-img-top"
//                     src={image}
//                     alt={name}
//                     width="200px"
//                     height="200px"
//                   />
//                   <div className="card-body m-0 d-flex justify-content-center flex-column">
//                     <h5 className="text-center">{name}</h5>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomizeMaleAccesories;
