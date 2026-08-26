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
    fontSize: "17px",
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
    padding: "4.5rem clamp(24px, 6vw, 80px) 6rem",
  },

  narrowContainer: {
    maxWidth: 380,
    margin: "16vh auto 0",
    padding: "0 1.75rem",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "3.5rem",
    gap: "1.5rem",
  },

  // General page heading (queue "Readings", login "Operator").
  heading: {
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "0.01em",
    color: colors.ink,
    margin: 0,
  },

  // Person's name on the detail page: 34px, bold.
  personName: {
    fontSize: "2.125rem",
    fontWeight: 700,
    color: colors.ink,
    margin: 0,
    lineHeight: 1.25,
  },

  subHeading: {
    fontSize: "17px",
    fontWeight: 400,
    color: colors.muted,
    margin: "0.5rem 0 0",
  },

  // Section heading: 22px, oxblood, bold, with a 3px gold underline
  // rule 60px wide sitting beneath it.
  sectionHeading: {
    fontSize: "1.375rem",
    fontWeight: 700,
    color: colors.oxblood,
    margin: 0,
    lineHeight: 1.3,
  },

  sectionHeadingRule: {
    width: 60,
    height: 3,
    background: colors.gold,
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
  },

  bodyText: {
    fontSize: "17px",
    fontWeight: 400,
    color: colors.ink,
    lineHeight: 1.7,
    margin: 0,
  },

  mutedText: {
    color: colors.muted,
    fontSize: "17px",
    fontWeight: 400,
    lineHeight: 1.7,
    margin: 0,
  },

  errorText: {
    color: colors.oxblood,
    fontSize: "0.95rem",
    fontWeight: 600,
    margin: "0.75rem 0 0",
  },

  noticeText: {
    borderLeft: `3px solid ${colors.oxblood}`,
    paddingLeft: "1rem",
    margin: "1.5rem 0",
    color: colors.muted,
    fontSize: "17px",
    lineHeight: 1.7,
  },

  backLink: {
    display: "inline-block",
    color: colors.muted,
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    marginBottom: "2.5rem",
  },

  label: {
    display: "block",
    fontSize: "17px",
    color: colors.ink,
    marginBottom: "1.75rem",
  },

  input: {
    display: "block",
    width: "100%",
    marginTop: "0.6rem",
    padding: "0.75rem 0.85rem",
    fontSize: "1rem",
    fontFamily,
    color: colors.ink,
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 6,
    boxSizing: "border-box",
  },

  quietButton: {
    fontFamily,
    fontSize: "0.9rem",
    fontWeight: 600,
    color: colors.ink,
    background: "transparent",
    border: `1px solid ${colors.muted}`,
    borderRadius: 6,
    padding: "0.6rem 1.2rem",
  },

  // Solid oxblood, white text, uppercase, letter-spaced, confident.
  primaryButton: {
    fontFamily,
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.paper,
    background: colors.oxblood,
    border: `1px solid ${colors.oxblood}`,
    borderRadius: 6,
    padding: "12px 24px",
  },

  sentLabel: {
    fontSize: "17px",
    fontWeight: 600,
    color: colors.muted,
  },

  queueList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  queueRowLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  // Each submission as its own card.
  queueRow: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.5rem",
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 8,
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  queueRowMarked: {
    borderLeft: `4px solid ${colors.oxblood}`,
  },

  queueRowName: {
    fontSize: "17px",
    fontWeight: 700,
    color: colors.ink,
    margin: "0 0 0.35rem",
  },

  queueRowMeta: {
    textAlign: "right",
    flexShrink: 0,
  },

  queueRowStatus: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: colors.muted,
    margin: "0.35rem 0 0",
  },

  // Small pill-shaped status badge, top-right of the card.
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "4px 10px",
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
    marginBottom: "3.5rem",
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: 0,
    alignItems: "start",
  },

  // Left column (the question groups): 48px of breathing room before the divider.
  answersColumn: {
    paddingRight: "48px",
  },

  answerGroup: {
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderRadius: 16,
    padding: "24px",
    marginBottom: "20px",
  },

  answerGroupLabel: {
    fontSize: "1.375rem",
    fontWeight: 700,
    color: colors.oxblood,
    margin: 0,
    lineHeight: 1.3,
  },

  answerItem: {
    marginBottom: "1.75rem",
  },

  // Question label: 14px, uppercase, letter-spaced, muted.
  answerQuestion: {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.muted,
    margin: "0 0 0.5rem",
    lineHeight: 1.45,
  },

  answerText: {
    fontSize: "17px",
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
    paddingLeft: "48px",
  },

  draftCard: {
    background: colors.paper,
    border: `1px solid ${colors.muted}`,
    borderTop: `3px solid ${colors.gold}`,
    borderRadius: 16,
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },

  fieldLabel: {
    display: "block",
    marginBottom: "20px",
  },

  // Small gold uppercase label directly above each draft textarea.
  fieldLabelText: {
    display: "block",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.gold,
    marginBottom: "0.5rem",
  },

  fieldHint: {
    display: "block",
    fontSize: "0.85rem",
    color: colors.muted,
    marginBottom: "0.5rem",
  },

  textarea: {
    display: "block",
    width: "100%",
    padding: "0.8rem 0.9rem",
    fontSize: "17px",
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
