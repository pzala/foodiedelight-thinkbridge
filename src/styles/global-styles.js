import { makeStyles } from "@fluentui/react-components";

const useGlobalStyles = makeStyles({
  mr3: {
    marginRight: "0.75rem",
  },
  textWrap: {
    wordWrap: "break-word",
    wordBreak: "break-word",
  },
  overflowAuto: {
    overflow: 'auto'
  },
  flexGrow: {
    flexGrow: 1,
    minHeight: 0,
    minWidth: 0
  }
});

export default useGlobalStyles;
