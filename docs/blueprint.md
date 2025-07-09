# **App Name**: NimbusCast

## Core Features:

- Cloud Motion Prediction: Generate future cloud motion frames (1-2 frames) using a diffusion model, based on past satellite imagery sequences. The LLM acts as a tool in generating the predicted frames.
- Data Ingestion GUI: Web-based GUI to ingest INSAT imagery data (VIS/IR/WV channels).
- Prediction vs. Ground Truth Comparison: Display predicted cloud movement frames alongside ground truth for visual comparison.
- Accuracy Evaluation Display: Implement accuracy evaluation metrics (SSIM, PSNR, MAE) and display results.
- Results Saving: Enable saving of prediction results and comparison data for analysis.

## Style Guidelines:

- Primary color: A serene light sky blue (#87CEEB) to reflect the meteorological focus and evoke a sense of calm and clarity, relating to the imagery being interpreted.
- Background color: A very light desaturated blue (#F0F8FF), complementing the primary color, and providing a clean, unobtrusive backdrop for the data.
- Accent color: A muted, analogous lavender (#B290D6) to add visual interest and highlight key interactive elements, while staying within the thematic range of sky and atmosphere.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and short information displays, and 'Inter' (sans-serif) for body text, where any more verbose information may be displayed.
- Use clean, modern icons to represent different data channels (VIS, IR, WV) and evaluation metrics.
- Implement a responsive layout to ensure usability across different screen sizes.
- Use subtle animations to highlight data loading and prediction processing.