import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LinearProgress, Grid } from "@material-ui/core";
import AuthRoutes from "../util/AuthRoutes";
import Section from "../components/Section";
import SettingCart from "../components/SettingCart";
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
            <Grid item  md={4} lg={3}>
              <SettingCart />
            </Grid>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default AppRouter;
