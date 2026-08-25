import content from "../content.json";

// The one file that talks to Google's Gemini API. Nothing else in the app
// should import "@google/generative-ai" or fetch generativelanguage.googleapis.com
// directly -- if the provider ever changes, this is the only file that moves.

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const DRAFT_SCHEMA = {
  type: "object",
  properties: {
    whatTheyActuallySay: { type: "string" },
    theOneThingInTheWay: { type: "string" },
    fourteenDays: { type: "array", items: { type: "string" } },
    notes: { type: "string" },
  },
  required: ["whatTheyActuallySay", "theOneThingInTheWay", "fourteenDays", "notes"],
};

function formatAnswersForPrompt(answers) {
  return content.reading.groups
    .map((group) => {
      const questions = group.questions
        .map((q) => `Q: ${q.text}\nA: ${answers[q.id] ?? "(no answer)"}`)
        .join("\n\n");
      return `### ${group.label}\n\n${questions}`;
    })
    .join("\n\n");
}

function parseDraftResponse(json) {
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") {
    throw new Error("Gemini response had no text content (blocked, empty, or malformed candidates).");
  }

  let draft;
  try {
    draft = JSON.parse(text);
  } catch {
    throw new Error("Gemini response was not valid JSON.");
  }

  if (typeof draft.whatTheyActuallySay !== "string") {
    throw new Error("Draft response missing whatTheyActuallySay string.");
  }
  if (typeof draft.theOneThingInTheWay !== "string") {
    throw new Error("Draft response missing theOneThingInTheWay string.");
  }
  if (!Array.isArray(draft.fourteenDays) || !draft.fourteenDays.every((d) => typeof d === "string")) {
    throw new Error("Draft response missing fourteenDays array of strings.");
  }
  if (typeof draft.notes !== "string") {
    throw new Error("Draft response missing notes string.");
  }

  return draft;
}

// Takes the 25 cleaned answers ({ q1: "...", q2: "...", ... }), formats them
// against content.json's reading.groups question text, and asks Gemini to
// draft a Reading using content.json's reading.prompt/model/maxTokens.
// Throws on any API error or malformed response -- callers decide what a
// failure means for the submission's stored state.
export async function generateDraft(answers) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not set.");
  }

  const { prompt, model, maxTokens } = content.reading;
  const fullPrompt = `${prompt}\n\nTHE 25 ANSWERS\n\n${formatAnswersForPrompt(answers)}`;

  const res = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        responseMimeType: "application/json",
        responseSchema: DRAFT_SCHEMA,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return parseDraftResponse(json);
}
