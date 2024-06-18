import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from "primereact/toast";
import CustomInput from '../Components/Input/CustomInput';
import { auth } from '../firebase';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import Nav from '../Components/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from 'react-redux';
import { setDashBoardPath, setSignedIn } from '../Redux/store';
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";



const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

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
              ).then((userCredential) => {
                dispatch(setSignedIn(true));
                const user = userCredential.user;

                dispatch(setSignedIn(true));
                dispatch(
                    setDashBoardPath(
                        `/dashboard/${user.uid}`
                    )
                  );  
                navigate(`/dashboard/${user.uid}`); // Navigate to dashboard with userID

              });
            reset();
            toastRef.current.show({ severity: 'success', summary: 'Sign in successful!' });
        } catch (error) {
            toastRef.current.show({ severity: 'error', summary: 'Error signing in', detail: error.message });
        }
        finally {
          setIsLoading(false);
        }
    };

  

    return (
        <>
            <Toast ref={toastRef} />
            <Nav />
            <div className="container">
                <h4 className="mb-4 mt-3 text-center">
                    <span className="text-warning">Log In</span> & Cash Out
                </h4>
                <div className=" mb-4 px-4">
          <h6 className="">Three Easy Steps</h6>
          <div className='mt-2' style={{color: "var(--light-text)"}}>
          <div className=" my-2 d-flex gap-2 align-items-start">
            <TbCircleNumber1 size={20} className="mt-1 " />
            <p>Access partner ID code from your dashboard</p>
          </div>
          <div className="  my-2 d-flex gap-2 align-items-start">
            <TbCircleNumber2 size={20} className="mt-1 " />
            <p>Share your code with friends and family</p>
          </div>
          <div className=" my-2 d-flex gap-2 align-items-start">
            <TbCircleNumber3 size={25} className="mt-1 " />
            <p>Earn 5 cedis (or equivalent) for every purchase they make!</p>
          </div>
            </div>
          
        </div>
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
                <p className="mt-3 text-center auth-alternative">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            </div>
        </>
    );
};

export default SignIn;
