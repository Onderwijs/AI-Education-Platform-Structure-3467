import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { oorspronkelijkeTekst, niveau, toon } = await req.json();
    const prompt = `
      Herschrijf de volgende tekst naar niveau ${niveau} en in een ${toon} toon.
      Houd de betekenis gelijk, maar maak de tekst geschikt voor het Nederlands onderwijs.
      
      Tekst: "${oorspronkelijkeTekst}"
      
      Geef alleen de herschreven tekst terug, zonder uitleg.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Je bent een tekstschrijver." }, { role: "user", content: prompt }],
      temperature: 0.5,
    });

    return NextResponse.json({ text: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Fout' }, { status: 500 });
  }
}