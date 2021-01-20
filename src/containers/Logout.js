import React from "react";
import { useApolloClient } from "@apollo/client";
import { isLoggedVar } from "../cache";
import { useHistory } from "react-router-dom";

function Logout({ children }) {
  const clinet = useApolloClient();
  const history = useHistory();
  const logout = () => {
    clinet.cache.gc();
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("username");
    isLoggedVar(false);
    history.push("/");
  };
  return (
    <>
      <div onClick={logout}>{children}</div>
    </>
  );
}

export default Logout;
