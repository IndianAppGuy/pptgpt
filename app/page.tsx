"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from '../components/upload-button';
import { cn } from "@/lib/utils";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [outline, setOutline] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setOutline('');
    setPdfUrl('');
    setStatus('Generating outline...');
    
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      if (files.length > 0) {
        files.forEach(file => formData.append('files', file));
      }

      // Get outline first
      const outlineResponse = await fetch('/api/outline', {
        method: 'POST',
        body: formData,
      });

      if (!outlineResponse.ok) throw new Error('Failed to generate outline');
      
      const outlineData = await outlineResponse.json();
      if (outlineData.error) throw new Error(outlineData.error);
      
      setOutline(outlineData.outline);
      setStatus('Generating PDF...');

      // Generate PDF once we have the outline
      const pdfResponse = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outline: outlineData.outline }),
      });

      if (!pdfResponse.ok) throw new Error('Failed to generate PDF');
      
      const pdfData = await pdfResponse.json();
      if (pdfData.error) throw new Error(pdfData.error);

      const pdfBlob = new Blob(
        [Buffer.from(pdfData.pdf, 'base64')],
        { type: 'application/pdf' }
      );
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setIsStarted(true);
      setStatus('');

    } catch (error) {
      console.error('Error:', error);
      setStatus('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
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
              <UploadButton type="file" onUpload={handleFileUpload} disabled={isLoading} />
              <UploadButton type="image" onUpload={handleFileUpload} disabled={isLoading} />
            </div>
          </div>
          {files.length > 0 && (
            <div className="mt-2 text-sm text-muted-foreground">
              {files.length} file(s) attached
            </div>
          )}
        </form>

        {/* Error status display */}
        {status && status.startsWith('Error') && (
          <div className="mt-4 max-w-3xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {status}
            </div>
          </div>
        )}

        {/* Outline display */}
        {outline && (
          <div className="mt-4 max-w-3xl mx-auto">
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Presentation Outline</h2>
              <pre className="whitespace-pre-wrap text-sm">
                {outline}
              </pre>
            </div>
          </div>
        )}

        {/* PDF display */}
        {pdfUrl && (
          <div className="mt-8 max-w-4xl mx-auto h-96 border rounded-lg overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Generated Presentation"
            />
          </div>
        )}
      </div>
    </main>
  );
}