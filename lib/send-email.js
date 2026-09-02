import content from "../content.json";

// The one file that talks to Resend. Nothing else in the app should
// fetch api.resend.com directly -- if the provider ever changes, this
// is the only file that moves.

const RESEND_API_URL = "https://api.resend.com/emails";

async function sendViaResend({ to, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    // Resend is not configured yet. We don't guess at keys -- the caller
    // just gets sent: false and whatever it was doing still succeeds.
    return false;
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      text,
      ...(html ? { html } : {}),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend API error (${res.status}): ${errText}`);
  }

  return true;
}

// Sent right after someone submits their 25 answers. Throws on any
// Resend error -- the route that calls this decides what a failure
// means for the response it sends back.
export async function sendConfirmationEmail(toEmail) {
  const { subject, body } = content.emails.confirm;
  return sendViaResend({ to: toEmail, subject, text: body });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Turns the final { whatTheyActuallySay, theOneThingInTheWay, fourteenDays }
// fields Aamir edited on the operator screen into a plain text body. Section
// headings come from content.json's operator.detail labels so this file
// introduces no copy of its own.
function formatReadingText(intro, final) {
  const { whatTheyActuallySayLabel, theOneThingInTheWayLabel, fourteenDaysLabel } =
    content.operator.detail;
  const days = (final?.fourteenDays || []).map((day, i) => `Day ${i + 1}: ${day}`).join("\n");

  return [
    intro,
    "",
    whatTheyActuallySayLabel,
    final?.whatTheyActuallySay || "",
    "",
    theOneThingInTheWayLabel,
    final?.theOneThingInTheWay || "",
    "",
    fourteenDaysLabel,
    days,
  ].join("\n");
}

// Same content as formatReadingText, laid out as simple HTML. Colours and
// the font come from content.json's brand tokens.
function formatReadingHtml(intro, final) {
  const { colors, typography } = content.brand;
  const { whatTheyActuallySayLabel, theOneThingInTheWayLabel, fourteenDaysLabel } =
    content.operator.detail;

  const days = (final?.fourteenDays || [])
    .map((day) => `<li style="margin-bottom:8px;">${escapeHtml(day)}</li>`)
    .join("");

  const heading = (label) =>
    `<h2 style="color:${colors.oxblood};font-size:18px;margin:32px 0 8px;">${escapeHtml(label)}</h2>`;
  const paragraph = (text) =>
    `<p style="line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(text || "")}</p>`;

  return `
    <div style="font-family:${typography.fontFamily};color:${colors.ink};background:${colors.paper};padding:32px;max-width:600px;margin:0 auto;">
      <p style="line-height:1.6;">${escapeHtml(intro)}</p>
      ${heading(whatTheyActuallySayLabel)}
      ${paragraph(final?.whatTheyActuallySay)}
      ${heading(theOneThingInTheWayLabel)}
      ${paragraph(final?.theOneThingInTheWay)}
      ${heading(fourteenDaysLabel)}
      <ol style="line-height:1.6;padding-left:20px;margin:0;">${days}</ol>
    </div>
  `;
}

// Sent when Aamir marks a submission as sent from the operator screen.
// Throws on any Resend error -- the caller decides what a failure means
// for the sent/sent_at update, which must succeed either way.
export async function sendReadingEmail(toEmail, final) {
  const { subject, body } = content.emails.delivery;
  return sendViaResend({
    to: toEmail,
    subject,
    text: formatReadingText(body, final),
    html: formatReadingHtml(body, final),
  });
}

// Sent when Aamir writes a personal reply to a flagged submission from
// the operator screen. Plain text only, in his own words -- no template,
// no formatting, because this is a human reply, not a Reading.
export async function sendPersonalReplyEmail(toEmail, replyText) {
  return sendViaResend({
    to: toEmail,
    subject: "Following up on what you shared",
    text: replyText,
  });
}
