import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Successful", { title: data?.payload?.message });
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
            Login to your account
          </h1>
          <p className="mt-2">
            Dont have an account?
            <Link
              className="font-medium text-primary hover:underline ml-2"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText="Sign In"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthLogin;
