// Cloudflare Pages Function: Server-side Gemini AI Proxy for VVC Webapp
// Keeps GEMINI_API_KEY strictly server-side (never exposed in the client bundle).

interface Env {
  GEMINI_API_KEY?: string;
}

interface IncomingHistoryItem {
  role?: string;
  text?: string;
}

interface ChatRequestBody {
  prompt?: unknown;
  context?: unknown;
  history?: unknown;
}

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
const MAX_PROMPT_LENGTH = 2000;
const MAX_CONTEXT_LENGTH = 200;
const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_TEXT_LENGTH = 1500;

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function callGemini(
  apiKey: string,
  model: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; text?: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text || '')
    .join('')
    .trim();

  if (!text) {
    return { ok: false, status: 502 };
  }

  return { ok: true, status: 200, text };
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const apiKey = context.env?.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return jsonResponse(
      { error: 'De AI assistent is momenteel niet geconfigureerd op de server.' },
      503
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await context.request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse({ error: 'Ongeldige JSON payload.' }, 400);
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
    return jsonResponse(
      { error: `Prompt is verplicht en mag maximaal ${MAX_PROMPT_LENGTH} tekens bevatten.` },
      400
    );
  }

  const pageContext =
    typeof body.context === 'string' && body.context.trim()
      ? body.context.trim().slice(0, MAX_CONTEXT_LENGTH)
      : 'Algemeen dashboard';

  const systemInstruction = `Je bent een behulpzame VVC assistent. Je helpt gebruikers met onboarding, sales vragen en platform navigatie. Context: ${pageContext}.`;

  const rawHistory = Array.isArray(body.history)
    ? (body.history as IncomingHistoryItem[])
    : [];

  const contents = rawHistory
    .filter(
      (msg, idx) =>
        !(idx === 0 && msg?.role === 'model') &&
        typeof msg?.text === 'string' &&
        msg.text.trim().length > 0
    )
    .slice(-MAX_HISTORY_ITEMS)
    .map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: (msg.text as string).trim().slice(0, MAX_HISTORY_TEXT_LENGTH) }],
    }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }],
  });

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 600,
    },
  };

  try {
    for (const model of MODELS) {
      const result = await callGemini(apiKey, model, payload);
      if (result.ok && result.text) {
        return jsonResponse({ reply: result.text }, 200);
      }
      if (result.status !== 404) {
        break;
      }
    }

    return jsonResponse(
      { error: 'Geen geldig antwoord ontvangen van de AI-service.' },
      502
    );
  } catch {
    return jsonResponse(
      { error: 'Er is een fout opgetreden bij het verbinden met de assistent.' },
      502
    );
  }
};
