import React from 'react';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { ImageGenerator } from '@/components/ImageGenerator';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [apiKey, setApiKey] = React.useState(() => 
    localStorage.getItem('replicate_api_key') || ''
  );
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">AI Image Generator</h1>
          <p className="text-muted-foreground">Create amazing images with AI</p>
        </div>

        <Card className="p-6 gradient-border bg-card">
          <div className="space-y-6">
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
            <ImageGenerator 
              apiKey={apiKey} 
              onGenerate={(url) => setGeneratedImage(url)} 
            />
          </div>
        </Card>

        {generatedImage && (
          <Card className="p-4 overflow-hidden gradient-border">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-auto rounded-lg"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;