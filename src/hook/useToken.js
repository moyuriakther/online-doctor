import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    axios
      .put(`http://localhost:5000/user/email=${email}`, currentUser)
      .then((res) => {
        setToken(res.data);
        console.log(res);
      });
  }, [user]);
  return [token];
};
export default useToken;
