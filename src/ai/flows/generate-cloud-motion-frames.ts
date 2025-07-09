// src/ai/flows/generate-cloud-motion-frames.ts
'use server';
/**
 * @fileOverview Generates future cloud motion frames based on past satellite imagery sequences.
 *
 * - generateCloudMotionFrames - A function that handles the cloud motion frame generation process.
 * - GenerateCloudMotionFramesInput - The input type for the generateCloudMotionFrames function.
 * - GenerateCloudMotionFramesOutput - The return type for the generateCloudMotionFrames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCloudMotionFramesInputSchema = z.object({
  pastFramesDataUris: z
    .array(z.string())
    .describe(
      'An array of past cloud motion frames, as data URIs that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  numFutureFrames: z
    .number()
    .describe('The number of future cloud motion frames to generate (1-2).'),
  channel: z.string().describe('The satellite imagery channel (VIS, IR, or WV).')
});
export type GenerateCloudMotionFramesInput = z.infer<
  typeof GenerateCloudMotionFramesInputSchema
>;

const GenerateCloudMotionFramesOutputSchema = z.object({
  futureFramesDataUris: z
    .array(z.string())
    .describe(
      'An array of generated future cloud motion frames, as data URIs that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateCloudMotionFramesOutput = z.infer<
  typeof GenerateCloudMotionFramesOutputSchema
>;

export async function generateCloudMotionFrames(
  input: GenerateCloudMotionFramesInput
): Promise<GenerateCloudMotionFramesOutput> {
  return generateCloudMotionFramesFlow(input);
}

const generateCloudMotionFramesPrompt = ai.definePrompt({
  name: 'generateCloudMotionFramesPrompt',
  input: {schema: GenerateCloudMotionFramesInputSchema},
  output: {schema: GenerateCloudMotionFramesOutputSchema},
  prompt: `You are an expert meteorologist AI specializing in short-term (0-3 hours) cloud motion forecasting over the Indian subcontinent using INSAT satellite imagery. Your task is to simulate realistic cloud evolution.

You are analyzing imagery from the '{{channel}}' channel.

You will use the following sequence of past cloud motion frames to predict the future cloud movement. The images are satellite views of the Indian subcontinent.

Past Frames:
{{#each pastFramesDataUris}}
  {{media url=this}}
{{/each}}

Based on this spatio-temporal sequence, generate {{numFutureFrames}} future cloud motion frames over the Indian subcontinent.

Return the generated frames as data URIs. Ensure the generated images maintain a realistic visual appearance and cloud texture consistent with meteorological patterns for the specified channel over India.
`,
});

const generateCloudMotionFramesFlow = ai.defineFlow(
  {
    name: 'generateCloudMotionFramesFlow',
    inputSchema: GenerateCloudMotionFramesInputSchema,
    outputSchema: GenerateCloudMotionFramesOutputSchema,
  },
  async input => {
    // This is a simplified stand-in for a complex diffusion model training and inference pipeline.
    // In a real application, this would involve a trained model (like a Conditional Diffusion Model with a UNet backbone).
    // For this prototype, we use a powerful generative model to simulate the output.

    const generatedFrames = [];
    let promptText = `Based on the provided past satellite frames from the {{channel}} channel, generate the next future cloud motion frame over the Indian subcontinent. Focus on realistic cloud evolution and dynamics.`;
    
    // Replace channel placeholder
    promptText = promptText.replace('{{channel}}', input.channel);
    
    let currentPastFrames = [...input.pastFramesDataUris];

    for (let i = 0; i < input.numFutureFrames; i++) {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: [
          ...currentPastFrames.map(uri => ({
            media: {url: uri},
          })),
          {
            text: promptText,
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      if (media?.url) {
        generatedFrames.push(media.url);
        // For multi-frame prediction, we can add the newly generated frame to the context for the next prediction.
        // This creates a sequential generation process.
        currentPastFrames.push(media.url);
        // To keep the context window from growing too large, we could also slide it.
        if(currentPastFrames.length > 4) {
          currentPastFrames.shift();
        }
      }
    }

    return {futureFramesDataUris: generatedFrames};
  }
);
