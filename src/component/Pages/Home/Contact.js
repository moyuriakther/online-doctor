import React from "react";
import { useForm } from "react-hook-form";
import bgImage from "../../../assets/images/appointment.png";

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div
      style={{ background: `url(${bgImage})`, backgroundSize: "cover" }}
      className="contact py-12 mt-16"
    >
      <div className="text-center">
        <p className="text-primary font-semibold">Contact Us</p>
        <h1 className="text-white text-2xl">Stay Connected With Us</h1>
      </div>
      <div className="flex justify-center">
        <form className="rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Subject"
            />
          </div>
          <div className="mb-6">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Subject"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btn bg-gradient-to-r from-secondary to-primary px-6"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
