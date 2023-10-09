// import React from "react";
// import DropDowner from "./DropDowner";
// import searchBG from "../Assets/se.jpg";
// import uuid from "react-uuid";

// const Categories = ({
//   title,
//   filters,
// }) => {
//   return (
//     <>
//       {/* Filters */}

//       <div
//         className="d-flex flex-column w-25 text-white rounded pt-2"
//         style={{
//           height: "15rem",
//           backgroundImage: `url(${searchBG})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <h4 className="text-center">{title}</h4>
//         {filters.map((filter) => (
//           <DropDowner
//             key={uuid()}
//             title={filter.name}
//             options={filter.options}
//             selectedColor="black"
//             bgColor="white"
//           />
//         ))}
//         <button className="btn btn-warning btn-sm mt-3 text-white shadow-sm mb-5">
//           Search
//         </button>{" "}
//       </div>
//     </>
//   );
// };

// export default Categories;
