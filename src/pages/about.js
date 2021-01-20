import React from "react";
import { Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { GET_ALL_USERS } from "../graphql/querys";
import { useQuery } from "@apollo/client";
import { Grid, LinearProgress, makeStyles } from "@material-ui/core";
import AboutCart from "../components/AboutCart";

const useStyles = makeStyles((theme) => ({
  Pagination: {
    margin: "auto",
    marginBottom: "50px",
  },
}));

function About() {
  const classes = useStyles();
  const [variables, setvariables] = React.useState({
    skip: 0,
    limit: 6,
  });
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables,
  });
  function handleChange(event, value) {
    const newskip = (value - 1) * variables.limit;
    setvariables({
      ...variables,
      skip: newskip,
    });
  }
  if (loading) return <LinearProgress />;
  if (error) return <h1>there are no user 😥</h1>;
  return (
    <>
      <Grid container justify="center" spacing={2}>
        {data.getAllUsers.length > 0 &&
          data.getAllUsers.map((user) => {
            return <AboutCart key={user._id} user={user} />;
          })}
        <Paper className={classes.Pagination}>
          {data.getAllUsers.length > 6 && (
            <Pagination
              size="large"
              count={Math.ceil(data.getUsersCount / variables.limit)}
              onChange={handleChange}
            />
          )}
        </Paper>
      </Grid>
    </>
  );
}
export default About;
