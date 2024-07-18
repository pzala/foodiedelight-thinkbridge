import { Card, CardPreview, Title3, Button, makeStyles, tokens } from "@fluentui/react-components";
import { ErrorCircle24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  errorCard: {
    maxWidth: "400px",
    margin: "40px auto",
    paddingTop: "2rem",
    width: "100%",
  },
  errorIcon: {
    width: "3rem !important",
    margin: "0 auto",
    color: tokens.colorPaletteRedForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
});
function ErrorCard({ message, onNavigateHome }) {
  const styles = useStyles();

  return (
    <Card className={styles.errorCard}>
      <CardPreview>
        <ErrorCircle24Regular className={styles.errorIcon} />
      </CardPreview>
      <Title3 align="center">{message}</Title3>
      {onNavigateHome && (
        <Button appearance="primary" onClick={onNavigateHome} style={{ marginTop: "20px" }}>
          Go Back to Home
        </Button>
      )}
    </Card>
  );
}
export default ErrorCard;
