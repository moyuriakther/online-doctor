import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  useEffect(() => {
    const email = user.email;
    axios
      .get(`https://online-doctor.onrender.com/admin/${email}`)
      .then((res) => {
        setAdmin(res.data.admin);
        setLoadingAdmin(false);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return [admin, loadingAdmin];
};

export default useAdmin;
