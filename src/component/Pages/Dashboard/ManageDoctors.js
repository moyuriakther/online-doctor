import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../Shared/LoadingSpinner";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ManageDoctors = () => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery(["doctors"], () =>
    axios
      .get("https://online-doctor.onrender.com/doctors", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err))
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h1 className="text-2xl text-secondary">
        Manage Doctors: {doctors?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <tr key={doctor?._id}>
                <th>{index + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={doctor?.image} alt={doctor?.name} />
                    </div>
                  </div>
                </th>
                <td>{doctor?.name}</td>
                <td>{doctor?.specialty}</td>
                <td>
                  <label
                    htmlFor="delete-confirm-modal"
                    className="btn btn-xs btn-error"
                    onClick={() => setConfirmDelete(doctor)}
                  >
                    DELETE
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {confirmDelete && (
          <DeleteConfirmModal
            refetch={refetch}
            setConfirmDelete={setConfirmDelete}
            confirmDelete={confirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ManageDoctors;
