import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setDashBoardPath,
  setSignedIn,
} from "../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useForm } from "react-hook-form";
import CustomInput from "../Components/Input/CustomInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import Nav from "../Components/Nav";
import ProductsDataService from "../Services/usersService";

const SignInAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const toastRef = useRef(null);



  const onSubmit = async (data) => {
    console.log(data)
  setIsLoading(true); 
  const { email, password } = data;
    try {

         await signInWithEmailAndPassword(
            auth,
            email,
            password
          ).then(async (userCredential) => {
            const user = userCredential.user;

            let userInfo = null;

            const buyerInfo = await ProductsDataService.getuserByField(
              "id",
              user.uid
            );

            userInfo = buyerInfo.data();

            if(userInfo.isAdmin){
              dispatch(setSignedIn(true));
              dispatch(
                setDashBoardPath(
                    `/admin-dashboard`
                )
              );  
              reset();
              toastRef.current.show({ severity: 'success', summary: 'Sign in successful!' });
              navigate(`/admin-dashboard`); // Navigate to dashboard with userID
            }
            else {
              toastRef.current.show({ severity: 'error', summary: 'Error signing in', detail: 'User is not an admin' });
            }

          });
    } catch (error) {
        toastRef.current.show({ severity: 'error', summary: 'Error signing in', detail: error.message });
    }
    finally {
      setIsLoading(false);
    }
};



  return (
    <>
      <Nav />
      <Toast ref={toastRef} />
      <div
        className="p-2 pb-3"
      >
        <div className="container mb-5 mt-2 d-flex justify-content-center rounded">
                    <form className="col-12 col-sm-6" onSubmit={handleSubmit(onSubmit)}>
                      
                      <CustomInput
                            label="Email"
                            {...register("email", { 
                                required: "Email is required", 
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email"
                                } 
                            })}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}

                        <CustomInput
                            label="Password"
                            // placeholder="Password"
                            type="password"
                            {...register("password", { required: "password is required", minLength: {
                              value: 6, message: "Password must have at least 6 characters"
                            } })}
                        />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        
                        <button type="submit" className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
                        > <span className="spinner-container">
                        {isLoading && (
                          <ProgressSpinner
                            style={{ width: "1.5rem", height: "1.5rem" }}
                            strokeWidth="8"
                            fill="var(--surface-ground)"
                            className="position-absolute top-50 start-50 translate-middle"
                          />
                        )}
                      </span>
                      Sign In</button>
                      <p className='auth-alternative'>
                      <Link to="/forgot-password">Forgot Password?</Link>

                      </p>

                       
                    </form>
                </div>
      </div>
    </>
  );
};

export default SignInAdmin;
