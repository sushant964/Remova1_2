/**
 * Background Removal Service Adapter
 * 
 * This service handles communication with the background removal API provider.
 * Currently configured for remove.bg as an example, but abstracted so it can
 * easily be swapped out for another provider (e.g., Clipdrop, Photoroom, Cloudinary).
 * 
 * CONFIGURATION REQUIRED:
 * Add BACKGROUND_REMOVAL_API_KEY to your .env file or environment variables.
 */

export async function removeBackground(imageBuffer: Buffer, mimeType: string): Promise<Buffer> {
  const apiKey = process.env.BACKGROUND_REMOVAL_API_KEY;
  
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    const error: any = new Error('API key not configured.');
    error.statusCode = 503;
    throw error;
  }

  // Example integration with remove.bg API
  const formData = new FormData();
  formData.append('image_file', new Blob([imageBuffer], { type: mimeType }), 'image.jpg');
  formData.append('size', 'auto');

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        const error: any = new Error('Invalid API credentials. Please check your BACKGROUND_REMOVAL_API_KEY.');
        error.statusCode = 401;
        throw error;
      }
      
      if (response.status === 429) {
        const error: any = new Error('Rate limit exceeded. Please try again later.');
        error.statusCode = 429;
        throw error;
      }

      // Handle provider-specific errors
      const errorText = await response.text();
      console.error('Provider error response:', errorText);
      const error: any = new Error('Failed to process image with provider.');
      error.statusCode = response.status;
      throw error;
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
    
  } catch (error: any) {
    // Re-throw our custom formatted errors, otherwise wrap in network error
    if (error.statusCode) {
      throw error;
    }
    const networkError: any = new Error('Network error while communicating with background removal service.');
    networkError.statusCode = 502;
    throw networkError;
  }
}
