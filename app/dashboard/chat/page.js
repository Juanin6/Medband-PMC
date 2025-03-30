"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Send, User, Bot, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const messagesEndRef = useRef(null)
  const [inputRows, setInputRows] = useState(1)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const rows = input.split("\n").length
    setInputRows(Math.min(5, Math.max(1, rows)))
  }, [input])

  const onSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "" || isLoading) return
    handleSubmit(e)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

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
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
              <Sparkles className="h-12 w-12 text-primary/50" />
              <h3 className="text-xl font-semibold">How can I help you today?</h3>
              <p className="max-w-md">Ask me anything! I can answer questions, provide information, or just chat.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "bg-blue-500" : "bg-primary"}`}>
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
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown
                        className="prose prose-sm max-w-none"
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          p: ({ node, ...props }) => <p {...props} className="mb-2" />,
                          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2" />,
                          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                          li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                          code: ({ node, inline, ...props }) =>
                            inline ? (
                              <code {...props} className="bg-gray-200 px-1 py-0.5 rounded text-sm" />
                            ) : (
                              <code {...props} className="block bg-gray-200 p-2 rounded text-sm overflow-x-auto" />
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
              Error: {error.message || "Something went wrong. Please try again."}
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
          <Button type="submit" size="icon" className="h-10 w-10 rounded-full" disabled={isLoading || input.trim() === ""}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}