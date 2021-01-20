import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Container,
  Grid,
  LinearProgress,
  Paper,
  withStyles,
  ThemeProvider,
} from "@material-ui/core";
import theme from "./util/theme";
import AppRouter from "./pages/router";
import { useQuery } from "@apollo/client";
import { THEME_TYPE } from "./graphql/client";

const AppBackground = withStyles((theme) => ({
  root: {
    background:
      theme.palette.type === "dark"
        ? `black`
        : `url(${process.env.PUBLIC_URL}/assets/background.jpg) no-repeat center center fixed`,
    backgroundSize: "cover",
    zIndex: -1,
    minHeight: "110vh",
    width: "100%",
    margin: 0,
  },
}))(Paper);

function App() {
  const {
    data: { themeType },
    loading,
  } = useQuery(THEME_TYPE);
  if (loading) return <LinearProgress />;
  return (
    <>
      <ThemeProvider theme={theme(themeType)}>
        <Router>
          <AppBackground square>
            <Container>
              <Grid container spacing={1}>
                <AppRouter />
              </Grid>
            </Container>
          </AppBackground>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
