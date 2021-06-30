import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import { useShowController } from "react-admin";

const useStyles = makeStyles((theme) => ({
  content: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    // add some margin-top to let free space for the page title which is position absolute
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(7),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
}));

const MarkdownIntroduction = ({ pageId }) => {
  const classes = useStyles();

  const config = {
    basePath: "/Page",
    id: process.env.REACT_APP_MIDDLEWARE_URL + `pages/${pageId}`,
    resource: "Page",
  };

  const { loaded, record } = useShowController(config);
  return loaded && record["semapps:content"] ? (
    <Paper className={classes.content} elevation={1}>
      <Markdown>{record["semapps:content"]}</Markdown>
    </Paper>
  ) : null;
};

export default MarkdownIntroduction;
