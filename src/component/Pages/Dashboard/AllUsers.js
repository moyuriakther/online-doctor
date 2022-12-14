import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.config";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AllUsers = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    axios
      .get("https://online-doctor.onrender.com/user", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/");
      })
  );
  const handleMakeAdmin = (user) => {
    const { currentEmail } = user;
    const userData = { message: "Admin" };
    const headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    if (user) {
      axios
        .put(
          `https://online-doctor.onrender.com/user/admin/${currentEmail}`,
          userData,
          {
            headers,
          }
        )
        .then((data) => {
          if (data.data.modifiedCount > 0) {
            refetch();
            toast("Successfully Make an admin");
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            toast.error("Failed to make an admin");
          }
        });
    }
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h1 className="text-3xl">All Users: {users?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Email</th>
              <th>Roll</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.currentEmail}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {" "}
                  <button className="btn btn-xs">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
