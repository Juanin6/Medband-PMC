"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useChat } from "ai/react";
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
import { Sparkles, Send, User, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ChatInterface() {
  const { messages, input, setMessages, handleInputChange, isLoading, error } =
    useChat();
  const messagesEndRef = useRef(null);
  const [inputRows, setInputRows] = useState(1);
  const [hasMounted, setHasMounted] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const us = searchParams.get("us");
  const ps = searchParams.get("ps");

  const buildPrompt = () => {
    console.log("Entrando a buildPrompt");
    console.log(userData);
    if (!userData) return input;

    const meds =
      userData.currentMedications?.map((m) => `- ${m}`).join("\n") || "Ninguna";
    const vaccines = userData.vaccinations
      ? Object.entries(userData.vaccinations)
          .map(([name, val]) => `- ${name}: ${val}`)
          .join("\n")
      : "Sin información";

    return `
Hola. A continuación, te doy mi información personal y médica para que la uses en todas tus respuestas. Por favor, tenla en cuenta siempre que te pregunte algo:

- Me llamo Laura.
- Mido 160 cm y peso 61 kg.
- Tengo las siguientes enfermedades crónicas:
- Diabetes \n Asma
- Estoy tomando estos medicamentos actualmente:
- Ninguno
- Estas son mis vacunas (true si la tengo, false si no):
- Covid 19 true \n Malaria true \n Hepatitis B true \n Influenza true \n Neumonia true \n Tetano true

Ahora, mi pregunta es:
${input}
`.trim();
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const rows = input.split("\n").length;
    setInputRows(Math.min(5, Math.max(1, rows)));
  }, [input]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isLoading) return;

    const prompt = buildPrompt();

    // Mostrar mensaje del usuario
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: input },
    ]);

    // Limpiar el input
    handleInputChange({ target: { value: "" } });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error("Error de red");

      const data = await res.json();

      // Mostrar la respuesta del asistente
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          role: "assistant",
          content: data.message || "No se pudo generar una respuesta.",
        },
      ]);
    } catch (err) {
      console.error("Error fetching from API:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          role: "assistant",
          content:
            "Hubo un problema al contactar al asistente. Intenta de nuevo.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };
  if (!hasMounted) return null;

  if (!us && !ps) return null;

  return (
    <Suspense fallback={<div>Cargando datos del usuario ...</div>}>
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-gray-200 mt-2">
        <CardHeader className="border-b bg-white">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Assistant</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                <Sparkles className="h-12 w-12 text-primary/50" />
                <h3 className="text-xl font-semibold">
                  How can I help you today?
                </h3>
                <p className="max-w-md">
                  Ask me anything! I can answer questions, provide information,
                  or just chat.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
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
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p {...props} className="mb-2 text-sm" />
                            ), // Add custom styles here
                            ul: ({ node, ...props }) => (
                              <ul
                                {...props}
                                className="list-disc pl-4 mb-2 text-sm"
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                {...props}
                                className="list-decimal pl-4 mb-2 text-sm"
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li {...props} className="mb-1 text-sm" />
                            ),
                            code: ({ node, inline, ...props }) =>
                              inline ? (
                                <code
                                  {...props}
                                  className="bg-gray-200 px-1 py-0.5 rounded text-sm"
                                />
                              ) : (
                                <pre className="bg-gray-200 p-2 rounded text-sm overflow-x-auto">
                                  <code {...props} />
                                </pre>
                              ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-4 bg-gray-100 text-gray-800">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 text-red-500 bg-red-50 rounded-lg">
                Error:{" "}
                {error.message || "Something went wrong. Please try again."}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="border-t p-4">
          <form onSubmit={onSubmit} className="flex w-full gap-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow resize-none min-h-[40px]"
              rows={inputRows}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 rounded-full"
              disabled={isLoading || input.trim() === ""}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </Suspense>
  );
}
