import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import ApolloApp from "./apolloProvider";
import "./index.css";

ReactDOM.render(ApolloApp, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
