import { format } from "date-fns";
import React from "react";

const AppointmentModal = ({ date, treatment, setTreatment }) => {
  const { name, slots } = treatment;
  const handleSubmit = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    console.log(name, slot, phone, email);
    setTreatment(null);
  };
  return (
    <div>
      <input type="checkbox" id="appointment-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="appointment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            onSubmit={handleSubmit}
            className="rounded px-8 pt-6 pb-8 mb-4 w-full "
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                disabled
                type="text"
                value={format(date, "PP")}
              />
            </div>
            <div className="mb-4">
              <select
                name="slot"
                className="select select-bordered w-full max-w-xs"
              >
                {slots.map((slot) => (
                  <option value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="name"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone Number"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gradient-to-r from-secondary to-primary text-white leading-tight focus:outline-none focus:shadow-outline"
                id="submit"
                type="submit"
                value="SUBMIT"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
