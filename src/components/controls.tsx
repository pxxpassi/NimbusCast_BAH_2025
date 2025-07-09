
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Thermometer, Droplets, Wand2, Minus, Plus } from 'lucide-react';

interface ControlsProps {
  onGenerate: (numPastFrames: number, numFutureFrames: number, channel: string) => void;
  loading: boolean;
}

export function Controls({ onGenerate, loading }: ControlsProps) {
  const [numPastFrames, setNumPastFrames] = useState(4);
  const [numFutureFrames, setNumFutureFrames] = useState(2);
  const [channel, setChannel] = useState('vis');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(numPastFrames, numFutureFrames, channel);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-2xl">Forecasting Controls</h2>
        <p className="text-muted-foreground">Configure prediction parameters.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8 pt-4">
        <div>
          <Label>Satellite Channel</Label>
          <Tabs defaultValue={channel} onValueChange={setChannel} className="w-full mt-2">
            <TabsList className="grid w-full grid-cols-3 bg-muted/80">
              <TabsTrigger value="vis"><Sun className="w-4 h-4 mr-1 sm:mr-2" />VIS</TabsTrigger>
              <TabsTrigger value="ir"><Thermometer className="w-4 h-4 mr-1 sm:mr-2" />IR</TabsTrigger>
              <TabsTrigger value="wv"><Droplets className="w-4 h-4 mr-1 sm:mr-2" />WV</TabsTrigger>
            </TabsList>
            <TabsContent value="vis" className="text-sm text-muted-foreground p-2 text-center">Visible spectrum imagery selected.</TabsContent>
            <TabsContent value="ir" className="text-sm text-muted-foreground p-2 text-center">Infrared spectrum imagery selected.</TabsContent>
            <TabsContent value="wv" className="text-sm text-muted-foreground p-2 text-center">Water Vapor imagery selected.</TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          <Label htmlFor="past-frames" className="flex justify-between">
            <span>Past Frames</span>
            <span className="font-bold">{numPastFrames}</span>
          </Label>
          <div className="flex items-center gap-2">
             <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setNumPastFrames(Math.max(1, numPastFrames - 1))}
                disabled={loading || numPastFrames <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Slider
                id="past-frames"
                min={1}
                max={4}
                step={1}
                value={[numPastFrames]}
                onValueChange={(value) => setNumPastFrames(value[0])}
                disabled={loading}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setNumPastFrames(Math.min(4, numPastFrames + 1))}
                disabled={loading || numPastFrames >= 4}
              >
                <Plus className="h-4 w-4" />
              </Button>
          </div>
        </div>
        <div className="space-y-4">
          <Label htmlFor="future-frames" className="flex justify-between">
            <span>Future Frames</span>
            <span className="font-bold">{numFutureFrames}</span>
          </Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setNumFutureFrames(Math.max(1, numFutureFrames - 1))}
              disabled={loading || numFutureFrames <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Slider
              id="future-frames"
              min={1}
              max={2}
              step={1}
              value={[numFutureFrames]}
              onValueChange={(value) => setNumFutureFrames(value[0])}
              disabled={loading}
            />
             <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setNumFutureFrames(Math.min(2, numFutureFrames + 1))}
              disabled={loading || numFutureFrames >= 2}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
          <Wand2 className="w-5 h-5 mr-2" />
          {loading ? 'Generating...' : 'Generate Prediction'}
        </Button>
      </form>
    </div>
  );
}
