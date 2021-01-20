import {
  Grid,
  Paper,
  LinearProgress,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";

const Sigin = lazy(() => import("../components/account/sigin"));
const Login = lazy(() => import("../components/account/login"));

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop:150,
    [theme.breakpoints.only("xs")]:{
      marginTop:50
    }
  },
  paper: {
    padding: "20px",
    display: "inline-Block",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
      display: "inline-Block",
    },
  },
  title: {
    fontSize: "4em",
    fontWeight: "700",
  },
  description: {
    fontSize: "2em",
    fontWeight: "700",
  },
}));

function Account() {
  const classes = useStyle();
  const { url } = useRouteMatch();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper} elevation={10}>
          <Typography className={classes.title} component="h1" color="primary">
            SoftFolio
          </Typography>
          <Typography className={classes.description} component="h1">
            welcome in softfolio chadjaa sofiane portfolio
          </Typography>
          <br />
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary">
              I'am a visitor
            </Button>
          </Link>
        </Paper>
      </Grid>

      <Grid item xs md >
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={`${url}/sigin`}>
              <Sigin />
            </Route>
            <Route path={`${url}/login`}>
              <Login />
            </Route>
          </Switch>
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default Account;
