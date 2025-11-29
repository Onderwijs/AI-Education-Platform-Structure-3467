import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { vak, niveau, onderwerp, aantalVragen, typeVragen } = await req.json();
    if (!vak || !onderwerp) return NextResponse.json({ error: 'Vul velden in' }, { status: 400 });

    const prompt = `
      Maak ${aantalVragen} toetsvragen voor het vak ${vak} op niveau ${niveau} over het onderwerp "${onderwerp}".
      Type vragen: ${typeVragen} (meerkeuze, open of mix).
      Geef de output terug als geldige JSON-array met dit format:
      [
        {
          "vraag": "",
          "type": "meerkeuze" of "open",
          "opties": ["A", "B", "C", "D"], // leeg bij open vragen
          "antwoord": "juiste antwoord"
        }
      ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Je bent een toetsenmaker." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    // Handle potential wrapper object if AI wraps array in key
    const content = completion.choices[0].message.content || "[]";
    const parsed = JSON.parse(content);
    const questions = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.vragen || []);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 });
  }
}