import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import AuthRoutes from "../util/AuthRoutes";
import Section from "../components/Section";
const Profile = lazy(() => import("./Profile"));
const Account = lazy(() => import("./account"));
const Error = lazy(() => import("../components/Error"));

function AppRouter() {
  return (
    <>
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Switch>
          <Route path="/error" component={() => <Error />} />
          <AuthRoutes path="/account" component={() => <Account />} />
          <Route path="/">
            <Switch>
              <Route path="/profile/:username" component={() => <Profile />} />
              <Section></Section>
            </Switch>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default AppRouter;
