import content from "../content.json";

// Every color and the font family below trace back to content.json's
// brand tokens. Nothing here is a literal hex or font name of its own.
const { colors, typography } = content.brand;
const { fontFamily } = typography;

export const theme = {
  colors,
  fontFamily,

  page: {
    minHeight: "100vh",
    background: colors.paper,
    color: colors.ink,
    fontFamily,
    "--operator-hover-bg": colors.hair,
    "--operator-ink": colors.ink,
  },

  container: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "4.5rem 2rem 6rem",
  },

  narrowContainer: {
    maxWidth: 360,
    margin: "16vh auto 0",
    padding: "0 1.75rem",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "3rem",
    gap: "1.5rem",
  },

  heading: {
    fontSize: "1.5rem",
    fontWeight: 400,
    letterSpacing: "0.01em",
    color: colors.ink,
    margin: 0,
  },

  subHeading: {
    fontSize: "0.95rem",
    color: colors.muted,
    margin: "0.35rem 0 0",
  },

  mutedText: {
    color: colors.muted,
    fontSize: "0.95rem",
    lineHeight: 1.6,
    margin: 0,
  },

  errorText: {
    color: colors.oxblood,
    fontSize: "0.9rem",
    margin: "0.75rem 0 0",
  },

  noticeText: {
    borderLeft: `2px solid ${colors.oxblood}`,
    paddingLeft: "0.9rem",
    margin: "1.25rem 0",
    color: colors.muted,
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },

  backLink: {
    display: "inline-block",
    color: colors.muted,
    fontSize: "0.9rem",
    textDecoration: "none",
    marginBottom: "2.5rem",
  },

  label: {
    display: "block",
    fontSize: "0.95rem",
    color: colors.ink,
    marginBottom: "1.75rem",
  },

  input: {
    display: "block",
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.6rem 0.7rem",
    fontSize: "1rem",
    fontFamily,
    color: colors.ink,
    background: colors.paper,
    border: `1px solid ${colors.hair}`,
    borderRadius: 2,
    boxSizing: "border-box",
  },

  quietButton: {
    fontFamily,
    fontSize: "0.9rem",
    color: colors.ink,
    background: "transparent",
    border: `1px solid ${colors.hair}`,
    borderRadius: 2,
    padding: "0.55rem 1.1rem",
  },

  primaryButton: {
    fontFamily,
    fontSize: "0.9rem",
    color: colors.oxblood,
    background: "transparent",
    border: `1px solid ${colors.oxblood}`,
    borderRadius: 2,
    padding: "0.6rem 1.3rem",
  },

  sentLabel: {
    fontSize: "0.9rem",
    color: colors.muted,
  },

  queueList: {
    display: "flex",
    flexDirection: "column",
  },

  queueRowLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  queueRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.5rem 0.75rem",
    borderTop: `1px solid ${colors.hair}`,
  },

  queueRowMarked: {
    borderLeft: `2px solid ${colors.oxblood}`,
    paddingLeft: "0.6rem",
  },

  queueRowName: {
    fontSize: "1.05rem",
    color: colors.ink,
    margin: "0 0 0.3rem",
  },

  queueRowMeta: {
    textAlign: "right",
    flexShrink: 0,
  },

  queueRowStatus: {
    fontSize: "0.85rem",
    color: colors.muted,
    margin: "0.3rem 0 0",
  },

  detailIntro: {
    marginBottom: "3rem",
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "4rem",
    alignItems: "start",
  },

  answerGroup: {
    marginBottom: "3rem",
  },

  answerGroupLabel: {
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.muted,
    margin: "0 0 1.5rem",
    fontWeight: 400,
  },

  answerItem: {
    marginBottom: "1.75rem",
  },

  answerQuestion: {
    fontSize: "0.85rem",
    color: colors.muted,
    margin: "0 0 0.4rem",
    lineHeight: 1.6,
  },

  answerText: {
    fontSize: "1rem",
    color: colors.ink,
    lineHeight: 1.7,
    margin: 0,
    whiteSpace: "pre-wrap",
  },

  draftColumn: {
    minWidth: 0,
  },

  fieldLabel: {
    display: "block",
    fontSize: "0.9rem",
    color: colors.ink,
    marginBottom: "1.75rem",
  },

  fieldHint: {
    display: "block",
    fontSize: "0.8rem",
    color: colors.muted,
    marginTop: "0.25rem",
  },

  textarea: {
    display: "block",
    width: "100%",
    marginTop: "0.5rem",
    padding: "0.7rem 0.8rem",
    fontSize: "0.95rem",
    fontFamily,
    lineHeight: 1.6,
    color: colors.ink,
    background: colors.paper,
    border: `1px solid ${colors.hair}`,
    borderRadius: 2,
    boxSizing: "border-box",
    resize: "vertical",
  },

  actionsRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginTop: "0.5rem",
    marginBottom: "2rem",
  },

  sentRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    paddingTop: "1.5rem",
    borderTop: `1px solid ${colors.hair}`,
  },
};
