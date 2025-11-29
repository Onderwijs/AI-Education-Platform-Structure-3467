import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { vak, niveau, tijdsduur, leerdoel } = await req.json();

    if (!vak || !niveau || !tijdsduur || !leerdoel) {
      return NextResponse.json({ error: 'Vul alle velden in' }, { status: 400 });
    }

    const prompt = `
      Je bent een ervaren docent. Maak een complete les voor:
      Vak: ${vak}
      Niveau: ${niveau}
      Tijdsduur: ${tijdsduur} minuten
      Leerdoel: ${leerdoel}

      Geef de les terug in JSON met deze structuur:
      {
        "titel": "",
        "intro": "",
        "leerdoelen": [],
        "benodigde_materialen": [],
        "lesverloop": {
          "start": "",
          "kern": "",
          "afsluiting": ""
        },
        "differentiatie": {
          "basis": "",
          "verdieping": ""
        },
        "evaluatie": ""
      }
      Zorg dat de output geldige JSON is.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Je helpt docenten lessen ontwerpen voor het Nederlandse onderwijs." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content || "{}";
    
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json({ lesson: parsed });
    } catch (e) {
      return NextResponse.json({ raw: content });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Interne serverfout' }, { status: 500 });
  }
}