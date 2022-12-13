import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({ refetch, setConfirmDelete, confirmDelete }) => {
  const { email, name } = confirmDelete;
  const handleDeleteDoctor = () => {
    axios
      .delete(`http://localhost:5000/doctors/${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Doctor Deleted Successfully");
          setConfirmDelete(null);
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure? You Want to Delete Doctor{" "}
            <span className="text-secondary">{name}</span>
          </h3>
          <p className="py-4">If You Delete ? You wont get the doctor again</p>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteDoctor()}
              className="btn btn-xs btn-error"
            >
              DELETE CONFIRM
            </button>
            <label
              htmlFor="delete-confirm-modal"
              className="btn btn-xs btn-error"
            >
              CANCEL
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
