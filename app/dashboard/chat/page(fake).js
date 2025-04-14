"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Send, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

const predefinedResponses = {
  hola: "¡Hola! ¿Cómo estás?",
  "Como estas": "Estoy bien, gracias por preguntar. ¿Y tú?",
  "me comi unos mariscos": "Juan, veo que eres alérgico a los mariscos.\n\n ¿Que hacer ahora?\n-Si tienes síntomas leves, como picazón o malestar estomacal, toma un antihistamínico\n-Si tienes dificultad para respirar, hinchazón severa o mareos, busca ayuda médica de inmediato",
  "me siento mareado y veo borroso ,que hago?": "Según tu historial, tienes hipertensión. Esto podría ser una señal de presión baja o alta. Si puedes, siéntate y mide tu presión. Si es demasiado alta o baja, busca ayuda de inmediato. Si los síntomas empeoran, llama a emergencias o a tu contacto de emergencia, María López (+34 600 123 456).",
  "no puedo respirar y me duele el pecho": "Esto podría ser una emergencia. Según tu historial de asma e hipertensión:\n-Si tienes tu inhalador, úsalo de inmediato.\n-Si el dolor de pecho es fuerte o no mejora, llama al 112 o pide ayuda a alguien cercano.\n-Si puedes, avisa a tu contacto de emergencia, María López (+34 600 123 456).",
  "he tomado mi medicamento dos veces por error, qué debo hacer?": "Depende del medicamento. Llama a un centro de toxicología o a tu médico para recibir orientación inmediata.",
  "Me corte y esta sangrando": "Aplica presión directa con un paño limpio sobre la herida y eleva la zona afectada. Si el sangrado no se detiene, busca atención médica.",
  "me duele mucho la cabeza ,es grave?": "Juan, lamento que tengas un fuerte dolor de cabeza.\nDado tu historial de hipertensión, un dolor de cabeza intenso podría estar relacionado con tu presión arterial. \nTe recomiendo:\n-Revisar tu presión arterial si tienes un tensiómetro disponible.\n-Descansar en un lugar tranquilo y sin luz intensa.-Hidratarte bien y evitar cafeína o alimentos con alto contenido de sodio.",
  "no siento los pies": "Juan, noto que mencionas que no sientes los pies.\n Dado tu historial de hipertensión, es importante verificar si tienes otros síntomas como mareos, visión borrosa o dolor de cabeza intenso. También, si has estado en una misma posición por mucho tiempo, intenta mover los pies y elevarlos para mejorar la circulación..",
  default: [
    "Interesante pregunta. Déjame pensarlo...",
    "Eso es algo sobre lo que muchas personas preguntan.",
    "Aquí tienes una posible respuesta a eso...",
    "No estoy seguro, pero puedo intentar explicarlo de otra manera.",
  ],
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hola Juan Pérez, soy tu asistente médico personal.\n\nAlergias:\n- Penicilina\n- Polen\n- Mariscos\n\nEnfermedades:\n- Asma\n- Hipertensión\n\nMedicamentos:\n- Salbutamol (cuando sea necesario)\n- Losartán 50 mg (una vez al día)\n\nContacto de emergencia:\nMaría López - +34 600 123 456\nAdicional: \n-Tengo un inhalador \n\nPregúntame lo que necesites. 😎",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const response =
        predefinedResponses[input.toLowerCase()] ||
        predefinedResponses["default"][
          Math.floor(Math.random() * predefinedResponses["default"].length)
        ];
      setMessages([...newMessages, { role: "assistant", content: response }]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-gray-200 mt-2">
      <CardHeader className="border-b bg-white">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>AI Assistant</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar
                  className={`h-8 w-8 ${
                    message.role === "user" ? "bg-blue-500" : "bg-primary"
                  }`}
                >
                  <AvatarFallback>
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow resize-none min-h-[40px]"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={input.trim() === ""}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
