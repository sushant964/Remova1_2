export async function processBackground(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/remove-background', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred during processing.';
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // Fallback if parsing JSON fails
      errorMessage = `Server returned status ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  // Expecting the API to return a raw image (PNG)
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
