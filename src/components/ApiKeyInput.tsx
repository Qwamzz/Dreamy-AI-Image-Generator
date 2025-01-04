import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { ExternalLink } from 'lucide-react';

export const ApiKeyInput = ({ 
  apiKey, 
  setApiKey 
}: { 
  apiKey: string; 
  setApiKey: (key: string) => void;
}) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = React.useState(apiKey);

  const saveApiKey = () => {
    localStorage.setItem('replicate_api_key', inputValue);
    setApiKey(inputValue);
    toast({
      title: "API Key saved",
      description: "Your API key has been saved to local storage",
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="password"
          placeholder="Enter your Replicate API key"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button onClick={saveApiKey} variant="secondary">Save Key</Button>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Get your API key from Replicate</span>
        <a 
          href="https://replicate.com/account/api-tokens" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          <ExternalLink size={14} />
          <span>here</span>
        </a>
      </div>
    </div>
  );
};