"use client";

import { useState } from 'react';
import type { GenerateCloudMotionFramesOutput } from '@/ai/flows/generate-cloud-motion-frames';
import { generateCloudMotionFrames } from '@/ai/flows/generate-cloud-motion-frames';
import { NimbusHeader } from '@/components/nimbus-header';
import { Controls } from '@/components/controls';
import { ResultsDisplay } from '@/components/results-display';
import { MetricsDisplay } from '@/components/metrics-display';
import { useToast } from '@/hooks/use-toast';

// Helper to fetch an image and convert it to a data URI
async function toDataURI(url: string): Promise<string> {
  const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch image from proxy: ${response.statusText}`);
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to data URI.'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [predictedFrames, setPredictedFrames] = useState<string[]>([]);
  const { toast } = useToast();

  const pastFrames = [
    'https://placehold.co/400x400.png',
    'https://placehold.co/400x400.png',
    'https://placehold.co/400x400.png',
    'https://placehold.co/400x400.png',
  ];

  const groundTruthFrames = [
    'https://placehold.co/400x400.png',
    'https://placehold.co/400x400.png',
  ];

  const handleGenerate = async (numPastFrames: number, numFutureFrames: number, channel: string) => {
    setLoading(true);
    setPredictedFrames([]);

    try {
      const framesToProcess = pastFrames.slice(0, numPastFrames);
      const pastFramesDataUris = await Promise.all(framesToProcess.map(url => toDataURI(url)));

      const result: GenerateCloudMotionFramesOutput = await generateCloudMotionFrames({
        pastFramesDataUris,
        numFutureFrames,
        channel,
      });
      
      if (result.futureFramesDataUris && result.futureFramesDataUris.length > 0) {
        setPredictedFrames(result.futureFramesDataUris);
      } else {
        throw new Error("The model did not return any future frames.");
      }

    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const accuracyMetrics = {
    ssim: 0.85,
    psnr: 30.2,
    mae: 15.7,
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <NimbusHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 p-6 bg-card border-r overflow-y-auto">
          <Controls onGenerate={handleGenerate} loading={loading} />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <ResultsDisplay 
            pastFrames={pastFrames}
            predictedFrames={predictedFrames}
            groundTruthFrames={groundTruthFrames}
            loading={loading}
          />
        </main>
        <aside className="w-80 p-6 bg-card border-l overflow-y-auto">
          <MetricsDisplay metrics={accuracyMetrics} hasPrediction={predictedFrames.length > 0}/>
        </aside>
      </div>
    </div>
  );
}
