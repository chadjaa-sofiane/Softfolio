import { Grid, IconButton, Paper } from "@material-ui/core";
import ProfileCard from "../components/profile/ProfileCard";
import { useHistory } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

function Profile() {
  const history = useHistory();
  return (
    <>
      <Grid item xs={12}>
        <Paper square>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs>
        <ProfileCard />
      </Grid>
    </>
  );
}

export default Profile;
