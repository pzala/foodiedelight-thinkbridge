import { makeStyles } from "@fluentui/react-components";
import React from "react";
const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "1rem",
    paddingLeft: "15px",
    paddingRight: "15px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",

    "@media (min-width: 768px)": {
      paddingTop: "10vh",
    },
  },
});

function FluentContainer({ children }) {
  const styles = useStyles();
  return <div className={styles.container}>{children}</div>;
}

export default FluentContainer;
