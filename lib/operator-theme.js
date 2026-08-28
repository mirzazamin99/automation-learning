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
    fontSize: "clamp(16px, 2.2vw, 19px)",
    lineHeight: 1.7,
    "--operator-hover-bg": colors.hair,
    "--operator-ink": colors.ink,
    "--operator-oxblood": colors.oxblood,
    "--operator-muted": colors.muted,
    "--operator-paper": colors.paper,
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "5rem clamp(24px, 6vw, 88px) 7rem",
  },

  // Two-panel login: left identity panel (oxblood) + right form panel (paper).
  loginScreen: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    background: colors.paper,
    fontFamily,
  },

  loginLeftPanel: {
    background: colors.oxblood,
    color: colors.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "6vw clamp(32px, 6vw, 88px)",
  },

  loginPanelTitle: {
    fontFamily,
    fontSize: "clamp(2.75rem, 4.5vw, 3.25rem)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    lineHeight: 1.08,
    color: colors.paper,
    margin: 0,
    maxWidth: 560,
  },

  loginPanelDescriptor: {
    fontFamily,
    fontSize: "clamp(15px, 2.2vw, 18px)",
    fontWeight: 400,
    lineHeight: 1.85,
    color: colors.paper,
    margin: "2rem 0 0",
    maxWidth: 420,
  },

  loginRightPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: colors.paper,
    padding: "6vw clamp(32px, 6vw, 88px)",
  },

  loginFormWrap: {
    width: "100%",
    maxWidth: 400,
  },

  signInHeading: {
    fontFamily,
    fontSize: "clamp(22px, 4vw, 28px)",
    fontWeight: 700,
    color: colors.ink,
    margin: "0 0 2.5rem",
  },

  loginLabel: {
    display: "block",
    fontSize: "clamp(13px, 1.8vw, 15px)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.muted,
    marginBottom: "2rem",
  },

  loginInput: {
    display: "block",
    width: "100%",
    marginTop: "0.75rem",
    padding: "16px 18px",
    fontSize: "clamp(15px, 2.2vw, 18px)",
    fontFamily,
    color: colors.ink,
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 6,
    boxSizing: "border-box",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "4rem",
    gap: "1.5rem",
  },

  // General page heading (queue "Readings", login "Operator"). Scaled up to
  // sit closer to the login screen's hero weight rather than body-copy size.
  heading: {
    fontSize: "clamp(1.6rem, 4.5vw, 2.25rem)",
    fontWeight: 700,
    letterSpacing: "0.01em",
    color: colors.ink,
    margin: 0,
    lineHeight: 1.2,
  },

  // Person's name on the detail page: the page's hero element.
  personName: {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    fontWeight: 700,
    color: colors.ink,
    margin: 0,
    lineHeight: 1.2,
  },

  subHeading: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 400,
    color: colors.muted,
    margin: "0.6rem 0 0",
  },

  // Section heading (h2, "Their answers" / "The draft"): oxblood, bold,
  // with a gold underline rule sitting beneath it.
  sectionHeading: {
    fontSize: "clamp(1.3rem, 3.5vw, 1.625rem)",
    fontWeight: 700,
    color: colors.oxblood,
    margin: 0,
    letterSpacing: "0.01em",
    lineHeight: 1.3,
  },

  sectionHeadingRule: {
    width: 72,
    height: 3,
    background: colors.gold,
    marginTop: "0.65rem",
    marginBottom: "1.75rem",
  },

  bodyText: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 400,
    color: colors.ink,
    lineHeight: 1.7,
    margin: 0,
  },

  mutedText: {
    color: colors.muted,
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 400,
    lineHeight: 1.7,
    margin: 0,
  },

  errorText: {
    color: colors.oxblood,
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    fontWeight: 600,
    margin: "0.75rem 0 0",
  },

  noticeText: {
    borderLeft: `3px solid ${colors.oxblood}`,
    paddingLeft: "1rem",
    margin: "1.5rem 0",
    color: colors.muted,
    fontSize: "clamp(16px, 2.2vw, 19px)",
    lineHeight: 1.7,
  },

  backLink: {
    display: "inline-block",
    color: colors.muted,
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    fontWeight: 600,
    textDecoration: "none",
    marginBottom: "2.5rem",
  },

  quietButton: {
    fontFamily,
    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
    fontWeight: 600,
    color: colors.ink,
    background: "transparent",
    border: `1px solid ${colors.muted}`,
    borderRadius: 6,
    padding: "0.6rem 1.2rem",
  },

  // Solid oxblood, paper text, uppercase, letter-spaced, confident.
  primaryButton: {
    fontFamily,
    fontSize: "clamp(14px, 2.2vw, 16px)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: colors.paper,
    background: colors.oxblood,
    border: `1px solid ${colors.oxblood}`,
    borderRadius: 6,
    padding: "14px 32px",
  },

  loginSubmitButton: {
    width: "100%",
    marginTop: "0.5rem",
  },

  sentLabel: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 600,
    color: colors.muted,
  },

  queueList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  queueRowLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  // Each submission as its own card. Radius matches the answer/draft cards
  // on the detail page so cards read as one consistent system throughout.
  queueRow: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 16,
    padding: "clamp(16px,4vw,28px) clamp(16px,4vw,32px)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    maxWidth: "100%",
    overflow: "hidden",
  },

  queueRowMarked: {
    borderLeft: `4px solid ${colors.oxblood}`,
  },

  queueRowName: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 700,
    color: colors.ink,
    margin: "0 0 0.4rem",
  },

  // Right-hand column of a queue card: badge stacked above the timestamp,
  // each right-aligned with a clean 12px gap between them so they never
  // collide, however short the card's content is.
  queueRowMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px",
    textAlign: "right",
    flexShrink: 0,
  },

  queueRowStatus: {
    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
    fontWeight: 600,
    color: colors.muted,
    margin: 0,
  },

  // Small pill-shaped status badge. Sits in normal flow at the top of
  // queueRowMeta rather than absolutely positioned, so it can never
  // overlap the timestamp beneath it.
  badge: {
    fontSize: "clamp(11px, 1.6vw, 12px)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "5px 12px",
    borderRadius: 999,
    lineHeight: 1.4,
  },

  badgeFlagged: {
    background: colors.oxblood,
    color: colors.paper,
  },

  badgeNormal: {
    background: colors.hair,
    color: colors.muted,
  },

  detailIntro: {
    marginBottom: "4rem",
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: 0,
    alignItems: "start",
  },

  // Left column (the question groups): generous breathing room before the divider.
  answersColumn: {
    paddingRight: "56px",
  },

  answerGroup: {
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 16,
    padding: "28px",
    marginBottom: "24px",
  },

  // Group label (h3, "Where you actually are"): a deliberate step down from
  // sectionHeading so the hierarchy reads clearly rather than flattening
  // every heading to the same weight.
  answerGroupLabel: {
    fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
    fontWeight: 700,
    color: colors.oxblood,
    margin: 0,
    letterSpacing: "0.005em",
    lineHeight: 1.3,
  },

  answerItem: {
    marginBottom: "1.75rem",
  },

  // Question label: 14px, uppercase, letter-spaced, muted.
  answerQuestion: {
    fontSize: "clamp(13px, 1.8vw, 15px)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.muted,
    margin: "0 0 0.5rem",
    lineHeight: 1.45,
  },

  answerText: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontWeight: 400,
    color: colors.ink,
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 640,
    whiteSpace: "pre-wrap",
  },

  // Right column: single elevated card, gold top border like a bookmark.
  draftColumn: {
    minWidth: 0,
    paddingLeft: "56px",
  },

  draftCard: {
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderTop: `3px solid ${colors.gold}`,
    borderRadius: 16,
    padding: "36px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  fieldLabel: {
    display: "block",
    marginBottom: "24px",
  },

  // Small gold uppercase label directly above each draft textarea, matching
  // the weight of the login screen's uppercase field labels.
  fieldLabelText: {
    display: "block",
    fontSize: "clamp(12px, 1.6vw, 14px)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.gold,
    marginBottom: "0.6rem",
  },

  fieldHint: {
    display: "block",
    fontSize: "clamp(0.78rem, 1.8vw, 0.85rem)",
    color: colors.muted,
    marginBottom: "0.6rem",
  },

  textarea: {
    display: "block",
    width: "100%",
    padding: "14px 16px",
    fontSize: "clamp(16px, 2.2vw, 19px)",
    fontFamily,
    lineHeight: 1.7,
    color: colors.ink,
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 6,
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
    paddingTop: "1.75rem",
    borderTop: `1px solid ${colors.hair}`,
  },
};
