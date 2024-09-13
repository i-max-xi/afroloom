import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import CustomInput from "../../Components/Input/CustomInput";
import { useSelector } from "react-redux";

const RequestPayout = ({ userData, calcluatedEarning, calculatedPaid }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const toastRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const currencySymbol = useSelector((state) => state.currencySymbol.symbol);
  const currencyFactor = useSelector((state) => state.currencySymbol.factor);

  const serviceProviders = [
    { label: "MTN", value: "MTN" },
    { label: "Telecel", value: "Telecel" },
    { label: "AirtelTigo", value: "AirtelTigo" },
  ];

  const onSubmit = async (data) => {
    if (calcluatedEarning < 5) {
      toastRef.current.show({
        severity: "error",
        summary: "Error sending request",
        detail: `Minimum payout amount is ${currencySymbol}${currencyFactor * 10}`,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const userInfo = {
      mobile_money_Number: data.mobileMoneyNumber,
      service_provider: data.serviceProvider,
      account_name: data.accountName,
      // number_of_sales: userData.count,
      // total_earning: calcluatedEarning,
      // already_paid: calculatedPaid,
      email: userData.email,
      to_pay: calcluatedEarning - calculatedPaid,
    };
    try {
      // Submit to formspree
      fetch(process.env.REACT_APP_formSpree, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userInfo,
          Subject: "AfroLoom Partner Payout Request",
        }),
      });
      reset();
      toastRef.current.show({
        severity: "success",
        summary: "Request sent successfully!",
        detail: "Payout is being processed, you will hear from us shortly",
      });
    } catch (error) {
      toastRef.current.show({
        severity: "error",
        summary: "Error sending request",
        detail: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <div className="container">
        <h4 className="mb-4 mt-3 text-center">
          <span className="text-warning">Request</span> Payout
        </h4>
        <div className="container mb-5 mt-5 d-flex justify-content-center rounded">
          <form className="col-12 col-sm-6" onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Mobile Money Number"
              placeholder="Enter your mobile money number"
              {...register("mobileMoneyNumber", {
                required: "Mobile Money Number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be at least 10 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Enter a valid mobile number",
                },
              })}
            />
            {errors.mobileMoneyNumber && (
              <p className="text-danger">{errors.mobileMoneyNumber.message}</p>
            )}

            <CustomInput
              label="Name on Account"
              placeholder="Enter full name on account"
              {...register("accountName", {
                required: "Name on account is required",
              })}
            />
            {errors.accountName && (
              <p className="text-danger">{errors.accountName.message}</p>
            )}

            <div className="form-group mb-3">
              <label htmlFor="serviceProvider" className="form-label">
                Service Provider
              </label>
              <Dropdown
                id="serviceProvider"
                {...register("serviceProvider", {
                  required: "Service Provider is required",
                })}
                options={serviceProviders}
                value={watch("serviceProvider")} // Add this line to bind the selected value
                placeholder="Select a Service Provider"
                className="w-100 h-25"
              />
              {errors.serviceProvider && (
                <p className="text-danger">{errors.serviceProvider.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-warning text-white w-100 mt-4 shadow-sm position-relative"
            >
              <span className="spinner-container">
                {isLoading && (
                  <ProgressSpinner
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    className="position-absolute top-50 start-50 translate-middle"
                  />
                )}
              </span>
              Request Payout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestPayout;
