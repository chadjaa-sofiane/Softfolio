import { Typography, Paper, withStyles } from "@material-ui/core";

const ErrorText = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}))(Typography);

function Error() {
  return (
    <>
      <Paper style={{ width:"100%" }}>
        <ErrorText variant="h1">
          Error 404 <br /> Page Not Found
        </ErrorText>
      </Paper>
    </>
  );
}
export default Error;
