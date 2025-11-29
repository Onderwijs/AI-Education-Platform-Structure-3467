import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { zin, taal, uitlegNiveau } = await req.json();
    const prompt = `
      Je bent een taalcoach voor leerlingen in het ${taal}-onderwijs.
      Verbeter de volgende zin: "${zin}"
      Geef als output geldige JSON met:
      {
        "verbeterd": "",
        "uitleg": "",
        "alternatieven": []
      }
      Pas de lengte van de uitleg aan: ${uitlegNiveau} (kort of uitgebreid).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Je bent een taalcoach." }, { role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json({ result: parsed });
  } catch (error) { return NextResponse.json({ error: 'Fout' }, { status: 500 }); }
}