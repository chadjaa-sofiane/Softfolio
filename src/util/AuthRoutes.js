import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLogged } from "./hooks";

function AuthRoutes({ component: Component, ...rest }) {
  const isLoggedIn = useLogged();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoutes;
