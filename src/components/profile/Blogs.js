import { useState } from "react";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  CardHeader,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Blogs({ blogs = [] }) {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton color="primary">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h4" color="primary">
            The Blogs
          </Typography>
        }
      />
      {blogs.map(({ _id, title, body, createdAt }) => (
        <Blog key={_id} title={title} body={body} createdAt={createdAt} />
      ))}
    </Card>
  );
}

const Blog = ({ title, body, createdAt }) => {
  const [openblogs, handleOpenBlogs] = useState(false);
  const classes = useStyles();
  const date = new Date(parseInt(createdAt)).toISOString();
  return (
    <Card style={{ background: "transparent" }}>
      <CardHeader
        title={
          <Typography variant="h4" color="secondary">
            {title}
          </Typography>
        }
        subheader={moment(date).fromNow(true)}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: openblogs,
            })}
            aria-expanded={openblogs}
            aria-label="show more"
            color="primary"
            onClick={() => handleOpenBlogs(!openblogs)}
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        }
      />
      <Collapse in={openblogs} timeout="auto">
        <CardContent>
          <Typography variant="h5" color="secondary">
            {body}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Blogs;
