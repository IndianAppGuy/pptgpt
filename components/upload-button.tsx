'use client'

import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ImageIcon, Paperclip } from 'lucide-react'

interface UploadButtonProps {
  onUpload: (files: FileList) => void
  type: 'file' | 'image'
}

export function UploadButton({ onUpload, type }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={handleClick}
      >
        {type === 'file' ? (
          <Paperclip className="h-4 w-4" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={type === 'image' ? 'image/*' : undefined}
        onChange={handleChange}
      />
    </>
  )
}

