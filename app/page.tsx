'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from '../components/upload-button';
import { cn } from "@/lib/utils";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [files] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Generate');
  const [isStarted, setIsStarted] = useState(false);
  const [presentationUrl, setPresentationUrl] = useState('');
  
  // New form state
  const [presentationType, setPresentationType] = useState('');
  const [audience, setAudience] = useState('');
  const [toneOfVoice, setToneOfVoice] = useState('');
  const [numberOfSlides, setNumberOfSlides] = useState('');
  const [useGoogleContent, setUseGoogleContent] = useState(false);

  const handleFileUpload = () => {
    //to be implemented later
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Generating...');
    setIsStarted(true);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('presentationType', presentationType);
      formData.append('audience', audience);
      formData.append('toneOfVoice', toneOfVoice);
      formData.append('numberOfSlides', numberOfSlides);
      formData.append('useGoogleContent', useGoogleContent.toString());
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/generate-presentation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate presentation');

      const data = await response.json();
      setPresentationUrl(data.url);
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
          <div className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <Select value={presentationType} onValueChange={setPresentationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Presentation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Tone of Voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={numberOfSlides} onValueChange={setNumberOfSlides}>
                <SelectTrigger>
                  <SelectValue placeholder="Presentation length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="3-5">3-5 slides</SelectItem>
                    <SelectItem value="5-8">5-8 slides</SelectItem>
                    <SelectItem value="8-12">8-12 slides</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">Get content from Google</span>
              <Switch
                checked={useGoogleContent}
                onCheckedChange={setUseGoogleContent}
              />
            </div>

            <div className="flex gap-1">
              <UploadButton type="file" onUpload={handleFileUpload} />
              <UploadButton type="image" onUpload={handleFileUpload} />
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
              className="w-full h-96 border border-gray-200 rounded-lg"
              frameBorder="0"
            />
          </div>
        )}
      </div>
    </main>
  );
}