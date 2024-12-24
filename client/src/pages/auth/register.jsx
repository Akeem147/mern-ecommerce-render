import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Successful", { title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast.error("Unable to register", { title: data?.payload?.message });
      }
    });
  }

  return (
    <>
      <Toaster />
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create a new account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link
              className="font-medium text-primary hover:underline ml-2"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthRegister;
