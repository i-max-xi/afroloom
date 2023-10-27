// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// // import { auth } from "../../firebase";

// const SignUp = () => {
//   //   const history = useHistory();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   // const [idNumber, setIdNumber] = useState("");

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       // Create a new user with email and password
//       // await auth.createUserWithEmailAndPassword(email, password);
//       console.log("User signed up successfully!");

//       // Clear the form fields after successful signup
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNext = () => {
//     setActiveIndex(activeIndex + 1);
//   };

//   return (
//     <>
//       <div className="container">
//         <h4 className="mb-4">
//           <span className="text-warning">Create</span> Account
//         </h4>
//         <form>
//           <div className="row">
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="First name"
//               />
//             </div>
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>

//           <section className="radio-section mt-2 mb-2">
//             <label className="mt-1" htmlFor="type">
//               Account Type:
//             </label>{" "}
//             <br />
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input radio"
//                 type="radio"
//                 name="inlineRadioOptions"
//                 id="inlineRadio1"
//                 value="option1"
//               />
//               <label className="form-check-label" for="inlineRadio1">
//                 Seller
//               </label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input radio"
//                 type="radio"
//                 name="inlineRadioOptions"
//                 id="inlineRadio2"
//                 value="option2"
//               />
//               <label className="form-check-label" for="inlineRadio2">
//                 Buyer
//               </label>
//             </div>
//           </section>

//           <div className="row">
//             <div className="col">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Country"
//               />
//             </div>
//             <div className="col">
//               <input type="text" className="form-control" placeholder="City" />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="number">Phone:</label>
//             <input
//               type="tel"
//               required
//               className="form-control"
//               id="number"
//               placeholder="+23..."
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* <div className="form-group">
//             <label htmlFor="idNumber">ID Number:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="idNumber"
//               value={idNumber}
//               onChange={(e) => setIdNumber(e.target.value)}
//             />
//           </div> */}

//           <button
//             type="button"
//             className="btn btn-warning text-white w-100 mt-4 shadow-sm"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//           <p className="mt-3 text=center">
//             Already have an account?{" "}
//             <Link to="/signin" className="">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SignUp;
