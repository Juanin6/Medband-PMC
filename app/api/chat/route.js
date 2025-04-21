import { NextResponse } from "next/server"

export async function POST(req) {
  const { messages } = await req.json()

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4", // o "gpt-3.5-turbo"
        messages: [
          {
            role: "system",
            content:  `
Eres un asistente de emergencias médicas inteligente. 
Tu objetivo es ayudar rápidamente en situaciones de salud utilizando los datos médicos del usuario.

Tienes acceso a información como:
- Nombre, edad, peso y estatura.
- Enfermedades crónicas.
- Medicación actual.
- Historial de vacunas.

Con esa información debes:
- Interpretar los síntomas que el usuario describe.
- Evaluar posibles causas o diagnósticos.
- Sugerir acciones inmediatas (como contactar a emergencias, tomar medicación, reposo, etc.).
- Ser claro, empático y directo, especialmente en casos urgentes.

No hagas suposiciones fuera de los datos dados. Si no tienes suficiente información, pide más detalles al usuario.
`
          },
          ...messages
        ],
        temperature: 0.7
      })
    })

    const json = await openaiRes.json()

    const reply = json.choices?.[0]?.message?.content || "Lo siento, no pude generar una respuesta."

    return NextResponse.json({ message: reply })

  } catch (err) {
    console.error("OpenAI API Error:", err)
    return NextResponse.json({ message: "Error al obtener respuesta del asistente." }, { status: 500 })
  }
}
