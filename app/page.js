import content from "../content.json";

const { brand, site, flags, prices } = content;
const { colors, typography } = brand;

const pageStyle = {
  backgroundColor: colors.paper,
  color: colors.ink,
  fontFamily: typography.fontFamily,
  minHeight: "100vh",
  fontSize: "1.2rem",
};

const wrap = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "2rem 1.25rem",
};

const heading = {
  color: colors.oxblood,
  fontWeight: "normal",
};

const hr = {
  border: "none",
  borderTop: `1px solid ${colors.hair}`,
  margin: "3rem 0",
};

const muted = {
  color: colors.muted,
  fontSize: "0.9rem",
};

const button = {
  display: "inline-block",
  backgroundColor: colors.oxblood,
  color: colors.paper,
  padding: "0.75rem 1.5rem",
  border: "none",
  fontFamily: typography.fontFamily,
  fontSize: "1.15rem",
  cursor: "pointer",
  textDecoration: "none",
};

export default function Home() {
  return (
    <div style={pageStyle}>
      <div style={wrap}>
        {flags.isDraftCopy && <p style={muted}>{site.draftNotice}</p>}

        <section>
          <h1 style={{ ...heading, fontSize: "2.6rem", lineHeight: 1.3 }}>
            {site.hero.line1}
          </h1>
          <p style={{ fontSize: "1.35rem" }}>{site.hero.line2}</p>
          <p style={{ marginTop: "1.5rem" }}>{site.hero.body}</p>
          <a href="/read" style={button}>{site.hero.buttonLabel}</a>
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.agreeingTo.heading}</h2>
          {site.agreeingTo.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.about.heading}</h2>
          {site.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <hr style={hr} />
        <section>
          <h2 style={heading}>{site.method.heading}</h2>
          <p>{site.method.intro}</p>
          {site.method.moves.map((m) => (
            <div key={m.number} style={{ marginBottom: "1.5rem" }}>
              <p style={{ ...muted, marginBottom: "0.25rem" }}>{m.number}</p>
              <h3 style={{ ...heading, marginBottom: "0.25rem" }}>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.refusals.heading}</h2>
          <ul style={{ paddingLeft: "1.25rem" }}>
            {site.refusals.items.map((item, i) => (
              <li key={i} style={{ marginBottom: "0.75rem" }}>{item}</li>
            ))}
          </ul>
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.sheetTeaser.heading}</h2>
          {site.sheetTeaser.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.testimonials.heading}</h2>
          <p>{site.testimonials.body}</p>
        </section>

        <hr style={hr} />

        {flags.showPrices && (
          <>
            <section>
              <h2 style={heading}>Pricing</h2>
              <p>Reading: {prices.reading === 0 ? "Free" : prices.reading}</p>
            </section>
            <hr style={hr} />
          </>
        )}        <section>
          <h2 style={heading}>{site.method.heading}</h2>
          <p>{site.method.intro}</p>
          {site.method.moves.map((m) => (
            <div key={m.number} style={{ marginBottom: "1.5rem" }}>
              <p style={{ ...muted, marginBottom: "0.25rem" }}>{m.number}</p>
              <h3 style={{ ...heading, marginBottom: "0.25rem" }}>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.refusals.heading}</h2>
          <ul style={{ paddingLeft: "1.25rem" }}>
            {site.refusals.items.map((item, i) => (
              <li key={i} style={{ marginBottom: "0.75rem" }}>{item}</li>
            ))}
          </ul>
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.sheetTeaser.heading}</h2>
          {site.sheetTeaser.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <hr style={hr} />

        <section>
          <h2 style={heading}>{site.testimonials.heading}</h2>
          <p>{site.testimonials.body}</p>
        </section>

        <hr style={hr} />

        {flags.showPrices && (
          <>
            <section>
              <h2 style={heading}>Pricing</h2>
              <p>Reading: {prices.reading === 0 ? "Free" : prices.reading}</p>
            </section>
            <hr style={hr} />
          </>
        )}
        <section>
          <h2 style={heading}>{site.boundary.heading}</h2>
          {site.boundary.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p style={muted}>{site.boundary.referralPlaceholder}</p>
        </section>

        <hr style={hr} />

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={heading}>{site.footer.heading}</h2>
          <p>{site.footer.body}</p>
          <button style={button}>{site.footer.buttonLabel}</button>
        </section>
      </div>
    </div>
  );
}
