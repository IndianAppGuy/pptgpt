"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from '../components/upload-button';
import { cn } from "@/lib/utils";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Generate');
  const [isStarted, setIsStarted] = useState(false);
  const [presentationUrl, setPresentationUrl] = useState('');

  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Generating...');
    setIsStarted(true);
    console.log(prompt);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      console.log(prompt);
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/generate-presentation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate presentation');
      
      const data = await response.json();
      console.log(data);
      setPresentationUrl(data.url);
      console.log(presentationUrl);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error');
    } finally {
      setIsLoading(false);
      setStatus('Generate');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className={cn(
        "container mx-auto transition-all duration-500",
        isStarted ? "pt-4" : "pt-16"
      )}>
        {!isStarted && (
          <div className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Create stunning presentations with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into professional presentations in seconds using the power of artificial intelligence
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={cn(
          "max-w-3xl mx-auto transition-all duration-500",
          isStarted ? "mb-4" : "mt-8"
        )}>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Describe your presentation idea..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-10 text-lg"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? status : "Generate"}
              </Button>
            </div>
            <div className="flex gap-1">
              <UploadButton type="file" onUpload={handleFileUpload}  />
              <UploadButton type="image" onUpload={handleFileUpload}  />
            </div>
          </div>
          {files.length > 0 && (
            <div className="mt-2 text-sm text-muted-foreground">
              {files.length} file(s) attached
            </div>
          )}
        </form>

        {presentationUrl && (
          <div className="max-w-3xl mx-auto mt-8">
            <iframe 
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(presentationUrl)}`}
              className="w-full h-[600px] border border-gray-200 rounded-lg"
              frameBorder="0"
            />
          </div>
        )}
      </div>
    </main>
  );
}