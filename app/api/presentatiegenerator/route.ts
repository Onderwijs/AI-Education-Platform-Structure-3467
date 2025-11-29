import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { onderwerp, niveau, aantalSlides } = await req.json();
    const prompt = `
      Maak een presentatie-outline over "${onderwerp}" voor niveau ${niveau}.
      Totaal ${aantalSlides} slides.
      Output JSON-array:
      [
        {
          "titel": "",
          "bulletpoints": []
        }
      ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Je bent een presentatie-expert." }, { role: "user", content: prompt }],
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content || "[]";
    const parsed = JSON.parse(content);
    const slides = Array.isArray(parsed) ? parsed : (parsed.slides || []);

    return NextResponse.json({ slides });
  } catch (error) { return NextResponse.json({ error: 'Fout' }, { status: 500 }); }
}