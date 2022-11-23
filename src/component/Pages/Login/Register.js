import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { clear } from "@testing-library/user-event/dist/clear";

const Register = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, cUser, cLoading, cError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, pUpdating, pError] = useUpdateProfile(auth);
  const [sendEmailVerification, eVerifySending, eVerifyError] =
    useSendEmailVerification(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    const success = await updateProfile({ displayName: data.name });
    const verifyEmail = await sendEmailVerification();
    if (verifyEmail) {
      toast("Sent verification email");
    }
    if (success) {
      toast("Updated profile");
    }
  };
  useEffect(() => {
    if (gUser || cUser) {
      console.log(gUser, cUser);
      navigate(from, { replace: true });
    }
  }, [gUser, cUser, from, navigate]);

  let signInError;
  if (gError || cError || pError || eVerifyError) {
    console.log(gError, cError, pError, eVerifyError);
    signInError = (
      <p className="text-red-600">{gError?.message || cError?.message}</p>
    );
  }
  if (gLoading || cLoading || pUpdating || eVerifySending) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type Your Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: { value: true, message: " Name is required" },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: { value: true, message: " Email is required" },
                  pattern: {
                    value: /.+@.+\.[A-Za-z]+$/,
                    message: "Provide a Valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: { value: true, message: " Password is required" },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{6,20}$/,
                    message: "Your Password is wrong",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signInError}
            <input
              type="submit"
              className="btn btn-accent w-full max-w-xs mt-2"
              value="Register"
            />
          </form>
          <p>
            <small>
              {" "}
              Already Have An Account?{" "}
              <Link className="text-secondary" to="/login">
                Please Login
              </Link>
            </small>
          </p>
          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
