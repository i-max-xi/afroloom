import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from "primereact/toast";
import CustomInput from '../Components/Input/CustomInput';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Nav from '../Components/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { ProgressSpinner } from "primereact/progressspinner";
import AllServices from '../Services/usersService';
import { generatePartnerCode } from '../utils/functions';
import { setDashBoardPath, setSignedIn,  } from '../Redux/store';
import { useDispatch } from 'react-redux';
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";




const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

    const { register, reset, handleSubmit, formState: { errors, isValid } } = useForm({
      mode: 'onChange'
    });
    const toastRef = useRef(null);

    const onSubmit = async (data) => {
      setIsLoading(true); 
        const { email, password, first_name, last_name } = data;
        console.log({data})
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                const partnerCode = generatePartnerCode(first_name, last_name);

                const userInfo = {
                  firstName: first_name,
                  lastName: last_name,
                  email: email,
                  partner_code: partnerCode,
                  count:0
                };

                const currentMonth = new Date().toLocaleString('default', { month: 'long' });

                const salesData = [{month: currentMonth, count: 0}]

                AllServices.addPartner({...userInfo, id: user.uid, salesData: salesData});
                
                // Submit to formspree
                fetch(process.env.REACT_APP_formSpree, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({...userInfo, Subject: "New AfroLoom Partner"}),
                });
            });

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
              toastRef.current.show({ severity: 'success', summary: 'Account created successfully!' });

              navigate(`/dashboard/${user.uid}`); // Navigate to dashboard with userID

            }); 

            reset();
            // navigate('/signin');
        } catch (error) {
            toastRef.current.show({ severity: 'error', summary: 'Error creating account', detail: error.message });
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
                <h4 className="mb-5 mt-3 text-center">
                    <span className="text-warning">Sign Up</span> & Earn Today
                </h4>
          <div className=" mb-4 px-4">
          <h6 className="">Three Easy Steps</h6>
          <div className='mt-2' style={{color: "var(--light-text)"}}>
          <div className=" my-2 d-flex gap-2 align-items-start">
            <TbCircleNumber1 size={20} className="mt-1 " />
            <p>Sign Up to receive a partner ID code</p>
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
                            label="First Name"
                            // placeholder="First Name"
                            {...register("first_name", { required: true })}
                          />
                          {errors.firstName && <p className="text-danger">First Name is required</p>}
                          <CustomInput
                            label="Last Name"
                            // placeholder="Last Name"
                            {...register("last_name", { required: true })}
                          />
                          {errors.lastName && <p className="text-danger">Last Name is required</p>}

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
                        
                        <button disabled={!isValid} type="submit" className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
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
                      Sign Up</button>

                       
                    </form>
                </div>
                <p className="mt-3 text-center auth-alternative">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
            </div>
        </>
    );
};

export default SignUp;
