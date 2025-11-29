import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { vak, niveau, taakOmschrijving, aantalCriteria } = await req.json();
    const prompt = `
      Maak een beoordelingsrubriek voor vak ${vak}, niveau ${niveau}, opdracht: "${taakOmschrijving}".
      Gebruik ${aantalCriteria} criteria.
      Niveaus: Onvoldoende, Voldoende, Goed, Uitstekend.
      
      Output JSON format:
      [
        {
          "criterium": "",
          "onvoldoende": "",
          "voldoende": "",
          "goed": "",
          "uitstekend": ""
        }
      ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "Je bent een onderwijskundige." }, { role: "user", content: prompt }],
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content || "[]";
    const parsed = JSON.parse(content);
    const rubric = Array.isArray(parsed) ? parsed : (parsed.rubric || parsed.rubriek || []);

    return NextResponse.json({ rubric });
  } catch (error) {
    return NextResponse.json({ error: 'Fout' }, { status: 500 });
  }
}