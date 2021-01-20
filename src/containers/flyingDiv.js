import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100vw",
    minHeight: "100vh",
    overflow:"scroll"
  },
  secondDiv: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,.4)",
  },
}));

function FlyingDiv({ handleOpen = () => {}, open = true, children }) {
  const classes = useStyle();
  if (!open) return "";
  return (
    <div className={classes.root}>
      <span
        className={classes.secondDiv}
        onClick={() => handleOpen(!open)}
      ></span>
      <div> {children} </div>
    </div>
  );
}

export default FlyingDiv;
