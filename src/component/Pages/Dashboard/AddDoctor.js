import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AddDoctor = () => {
  const { data: allAppointment, isLoading } = useQuery(["allAppointment"], () =>
    axios
      .get("https://online-doctor.onrender.com/appointments")
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imageBbKey = "23d21aa40fa9cb10bb4b2f33af9abf8a";
  const onSubmit = async (data) => {
    const image = data.image[0];
    let formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageBbKey}`;
    axios.post(url, formData).then((res) => {
      const imageUrl = res.data.data.url;
      const doctor = {
        name: data.name,
        email: data.email,
        specialty: data.specialty,
        image: imageUrl,
      };
      axios
        .post(`https://online-doctor.onrender.com/doctors`, doctor, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          const result = res.data;
          console.log(result);
          if (result.insertedId) {
            toast("Doctor Add Successfully");
            reset();
          } else {
            toast.error("Failed To Add A Doctor");
          }
        })
        .catch((err) => {
          const error = err;
          if (error) {
            toast.error("Something Went Wrong");
          }
        });
    });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="py-8 w-full bg-base-100">
      <div>
        <h1 className="text-2xl text-secondary">ADD DOCTOR</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type Your Name"
              className="input input-bordered w-full max-w-xs xs:mr-8"
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
              <span className="label-text">Specialty</span>
            </label>
            <select
              {...register("specialty")}
              className="select select-success w-full max-w-xs"
            >
              {allAppointment?.map((appointment) => (
                <option key={appointment._id}>{appointment.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
              {...register("image", {
                required: { value: true, message: " Image is required" },
              })}
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-600">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>
          <input
            type="submit"
            className="btn btn-accent w-full max-w-xs mt-2"
            value="ADD doctor"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
