import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { themeType } from "../cache";

function ChangeTheme() {
  const [themetype, changeThemeType] = React.useState(themeType() === "dark");
  const onChange = (event) => {
    const { checked } = event.target;
    changeThemeType(checked);
    const theme = checked ? "dark" : "light";
    localStorage.removeItem("themeType");
    localStorage.setItem("themeType", theme);
    themeType(theme);
  };
  return (
    <>
      <FormControlLabel
        control={<Switch checked={!!themetype} onChange={onChange} />}
        label="dark Paper"
      />
    </>
  );
}

export default ChangeTheme;
