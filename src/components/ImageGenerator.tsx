import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

export const ImageGenerator = ({
  apiKey,
  onGenerate
}: {
  apiKey: string;
  onGenerate: (imageUrl: string) => void;
}) => {
  const [prompt, setPrompt] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Replicate API key first",
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${apiKey}`,
        },
        body: JSON.stringify({
          version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          input: { prompt },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const prediction = await response.json();
      
      // Poll for the result
      const checkResult = async () => {
        const resultResponse = await fetch(
          `https://api.replicate.com/v1/predictions/${prediction.id}`,
          {
            headers: {
              Authorization: `Token ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        const resultData = await resultResponse.json();
        
        if (resultData.status === "succeeded") {
          onGenerate(resultData.output[0]);
          setIsLoading(false);
        } else if (resultData.status === "failed") {
          throw new Error('Image generation failed');
        } else {
          setTimeout(checkResult, 1000);
        }
      };

      checkResult();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please check your API key and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={generateImage} 
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
    </div>
  );
};