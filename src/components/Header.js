import React from "react";
import {
  Paper,
  Tabs,
  Tab,
  makeStyles,
  Grid,
  IconButton,
  withStyles,
  Drawer,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { SettingList } from "./SettingCart";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navButton: {
    margin: "0 auto",
    float: "right",
  },
  navbar: {
    width: 250,
    padding: 5,
    zIndex: 1,
  },
}));

const AppDrawer = withStyles((theme) => ({
  root: {
    backdropFilter: "blur(5px)",
  },
}))(Drawer);

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const { pathname } = useLocation();
  const paths = ["/", "/About"];
  const pathindex = paths.indexOf(pathname) < 0 ? 0 : paths.indexOf(pathname);
  const [value, setValue] = React.useState(pathindex);
  const [navState, setnavState] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(paths[newValue]);
  };
  return (
    <>
      <Paper square>
        <Grid item xs>
          <IconButton
            onClick={() => setnavState(!navState)}
            className={classes.navButton}
          >
            <DehazeIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={7}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Home" />
            <Tab label="About" />
          </Tabs>
        </Grid>
        <AppDrawer
          anchor="right"
          open={navState}
          onClose={() => setnavState(false)}
        >
          <Paper className={classes.navbar}>
            <SettingList />
          </Paper>
        </AppDrawer>
      </Paper>
    </>
  );
};

export default Header;
