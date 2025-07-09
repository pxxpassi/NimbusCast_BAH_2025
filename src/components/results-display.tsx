import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDisplayProps {
  pastFrames: string[];
  predictedFrames: string[];
  groundTruthFrames: string[];
  loading: boolean;
}

const ImageGrid = ({ frames, loading, loadingFramesCount = 2, hint }: { frames: string[], loading?: boolean, loadingFramesCount?: number, hint: string }) => {
  const isLoading = loading && frames.length === 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading ? (
        Array.from({ length: loadingFramesCount }).map((_, index) => (
          <Skeleton key={index} className="w-full h-auto aspect-square rounded-lg bg-muted/50" />
        ))
      ) : frames.length > 0 ? (
        frames.map((frame, index) => (
          <Image
            key={index}
            src={frame}
            alt={`Frame ${index + 1}`}
            width={400}
            height={400}
            className="rounded-lg border-2 border-border/80 aspect-square object-cover"
            data-ai-hint={hint}
          />
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-48 bg-muted/30 rounded-lg border-dashed border-2">
            <p className="text-muted-foreground">No frames to display.</p>
        </div>
      )}
    </div>
  )
};

export function ResultsDisplay({ pastFrames, predictedFrames, groundTruthFrames, loading }: ResultsDisplayProps) {
  return (
    <Card className="shadow-lg border-border/80 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Cloud Motion Visualization</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Tabs defaultValue="predicted" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="input">Input Sequence</TabsTrigger>
            <TabsTrigger value="predicted">Predicted Sequence</TabsTrigger>
            <TabsTrigger value="ground-truth">Ground Truth</TabsTrigger>
          </TabsList>
          <TabsContent value="input" className="flex-grow mt-4">
             <ImageGrid frames={pastFrames} hint="cloud satellite" />
          </TabsContent>
          <TabsContent value="predicted" className="flex-grow mt-4">
            <ImageGrid 
              frames={predictedFrames} 
              loading={loading}
              loadingFramesCount={2}
              hint="weather map"
            />
          </TabsContent>
          <TabsContent value="ground-truth" className="flex-grow mt-4">
            <ImageGrid frames={groundTruthFrames} hint="storm cloud" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
