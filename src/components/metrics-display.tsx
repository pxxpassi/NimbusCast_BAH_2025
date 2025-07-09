"use client";

import { Button } from '@/components/ui/button';
import { Download, Sigma, GitCompareArrows, Gauge } from 'lucide-react';

interface MetricsDisplayProps {
  metrics: {
    ssim: number;
    psnr: number;
    mae: number;
  };
  hasPrediction: boolean;
}

const MetricCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) => (
    <div className="flex items-center gap-4 bg-background p-4 rounded-lg border">
        <div className="p-3 rounded-md bg-accent/10 text-accent">
            {icon}
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold font-headline">{value}</p>
        </div>
    </div>
)

export function MetricsDisplay({ metrics, hasPrediction }: MetricsDisplayProps) {
    
  if (!hasPrediction) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-muted/30 rounded-lg border-dashed p-6 text-center">
            <h2 className="font-headline text-2xl">Accuracy Evaluation</h2>
            <p className="text-muted-foreground mt-2">Metrics will be displayed here after a prediction is generated.</p>
        </div>
      )
  }
    
  return (
    <div className="space-y-6">
       <div>
        <h2 className="font-headline text-2xl">Accuracy Evaluation</h2>
        <p className="text-muted-foreground">Comparison of predicted vs. ground truth data.</p>
      </div>
      <div className="space-y-4 pt-4">
        <MetricCard icon={<GitCompareArrows className="w-6 h-6" />} title="SSIM" value={metrics.ssim} />
        <MetricCard icon={<Gauge className="w-6 h-6" />} title="PSNR (dB)" value={metrics.psnr} />
        <MetricCard icon={<Sigma className="w-6 h-6" />} title="MAE" value={metrics.mae} />
      </div>
      <Button variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Save Results
      </Button>
    </div>
  );
}
