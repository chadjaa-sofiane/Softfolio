import { Grid, LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "../components/Header";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/about"));

export default function Section() {
  const { url } = useRouteMatch();
  return (
    <>
      <Grid item xs={12}>
        <Header></Header>
      </Grid>
      <Grid container item xs justify="center">
        <Suspense fallback={<LinearProgress color="primary" />}>
          <Switch>
            <Route path={`${url}`} exact>
              <Home />
            </Route>
            <Route path={`${url}About`}>
              <About />
            </Route>
          </Switch>
        </Suspense>
      </Grid>
    </>
  );
}
