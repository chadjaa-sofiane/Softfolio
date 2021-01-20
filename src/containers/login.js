import { useHistory } from "react-router-dom";
function Login({ children }) {
  const history = useHistory();
  return <div onClick={() => history.push("/account/login")}>{children}</div>;
}

export default Login;
