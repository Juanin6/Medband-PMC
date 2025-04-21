"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    await onUpload(file)
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="file-upload">Archivo médico</Label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.txt"
          onChange={handleFileChange}
          className="text-sm"
        />
        {file && <p className="text-sm text-gray-600 truncate max-w-xs">📄 {file.name}</p>}
      </div>

      <Button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
        className="h-10 flex gap-2 items-center"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {loading ? "Subiendo..." : "Analizar archivo"}
      </Button>
    </div>
  )
}
