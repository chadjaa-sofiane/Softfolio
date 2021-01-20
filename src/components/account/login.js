import { useMutation } from "@apollo/client";
import {
  Button,
  ButtonGroup,
  makeStyles,
  TextField,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { useForm } from "../../util/hooks";
import { LOGIN } from "../../graphql/mutations";
import { useHistory } from "react-router-dom";
import { isLoggedVar} from "../../cache";
const useStyle = makeStyles(() => ({
  paper: {
    margin: "auto",
    width: "400px",
    padding: "30px 15px",
    marginTop: 20,
  },
  TextFields: {
    width: "100%",
    marginTop: "20px",
    margin: "auto",
    fontWeight: "bold",
  },
  btns: {
    color: "red",
  },
  errText: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
}));

function Login() {
  const classes = useStyle();
  const history = useHistory();
  const { onChange, onSubmit, setErrors, errors, values } = useForm(Login, {
    userInput: "",
    password: "",
  });
  const [login, { loading }] = useMutation(LOGIN, {
    update(_, resault) {
      setErrors({});
      isLoggedVar(true);
      localStorage.setItem("token", resault.data.login.token);
      history.push("/");
    },
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function Login() {
    login();
  }
  return (
    <Paper className={classes.paper} elevation={10}>
      <form className={classes.root}>
        <TextField
          className={classes.TextFields}
          type="text"
          variant="outlined"
          value={values.userInput}
          placeholder="username ou email"
          color="secondary"
          size="small"
          name="userInput"
          error={errors.userInput ? true : false}
          onChange={onChange}
          helperText={
            <span className={classes.errText}>{errors.userInput}</span>
          }
        />
        <TextField
          className={classes.TextFields}
          type="password"
          variant="outlined"
          value={values.password}
          placeholder="enter your password"
          color="secondary"
          name="password"
          error={errors.password ? true : false}
          onChange={onChange}
          helperText={
            <span className={classes.errText}>{errors.password}</span>
          }
        />
      </form>
      {loading && <CircularProgress />}
      <ButtonGroup className={classes.TextFields}>
        <Button variant="outlined" color="primary" onClick={onSubmit}>
          LOGIN
        </Button>
        <Button variant="outlined" color="secondary" disabled>
          CREATE AN ACCOUNT
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

export default Login;
