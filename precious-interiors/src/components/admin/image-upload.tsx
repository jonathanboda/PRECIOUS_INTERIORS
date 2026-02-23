'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Link as LinkIcon } from 'lucide-react'
import { uploadImage } from '@/lib/actions/upload'

interface ImageUploadProps {
  name: string
  value?: string
  onChange?: (url: string) => void
}

export function ImageUpload({ name, value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploading(true)

    // Show preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Supabase
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImage(formData)

    setUploading(false)

    if (result.error) {
      setError(result.error)
      setPreview(value || '')
      return
    }

    if (result.url) {
      setPreview(result.url)
      onChange?.(result.url)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreview(urlInput.trim())
      onChange?.(urlInput.trim())
      setShowUrlInput(false)
      setUrlInput('')
    }
  }

  const handleRemove = () => {
    setPreview('')
    onChange?.('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={preview} />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-48 object-cover rounded-lg border border-neutral-200"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : showUrlInput ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter image URL..."
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Add
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <label className="flex flex-col items-center justify-center h-32 w-40 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-neutral-50 transition-colors">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <Loader2 className="h-8 w-8 text-neutral-400 animate-spin" />
            ) : (
              <>
                <Upload className="h-8 w-8 text-neutral-400" />
                <span className="mt-2 text-sm text-neutral-500">Upload</span>
              </>
            )}
          </label>

          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="flex flex-col items-center justify-center h-32 w-40 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-neutral-50 transition-colors"
          >
            <LinkIcon className="h-8 w-8 text-neutral-400" />
            <span className="mt-2 text-sm text-neutral-500">Add URL</span>
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <p className="text-xs text-neutral-500">
        Upload any image or paste a URL
      </p>
    </div>
  )
}
