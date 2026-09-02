import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Download, Loader2, ArrowRight, AlertCircle, RefreshCw, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { processBackground } from '../lib/image-processing';
import { cn } from '../lib/utils';

type UploadState = 'idle' | 'preview' | 'processing' | 'result';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const LOADING_TEXTS = [
  "Uploading image...",
  "Removing background...",
  "Preparing your PNG..."
];

export function Uploader() {
  const [state, setState] = useState<UploadState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycle loading text when in processing state
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === 'processing') {
      setLoadingTextIndex(0);
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev < LOADING_TEXTS.length - 1 ? prev + 1 : prev));
      }, 2500); // cycle every 2.5s
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl && resultUrl !== previewUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  const handleFile = (selectedFile: File) => {
    setError(null);
    
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    
    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setFile(selectedFile);
      setPreviewUrl(url);
      setState('preview');
    };
    img.onerror = () => {
      setError('Failed to load image. Please try another file.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    
    setState('processing');
    try {
      const processedUrl = await processBackground(file);
      setResultUrl(processedUrl);
      setState('result');
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing. Please try again.');
      setState('preview');
    }
  };

  const reset = () => {
    setState('idle');
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl && resultUrl !== previewUrl) URL.revokeObjectURL(resultUrl);
    setPreviewUrl(null);
    setResultUrl(null);
    setDimensions(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-red-800">{error}</p>
        </motion.div>
      )}

      <div className="relative rounded-3xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-200 overflow-hidden min-h-[400px] flex flex-col">
        
        {/* State: Idle */}
        {state === 'idle' && (
          <div 
            className={cn(
              "flex-1 flex flex-col items-center justify-center p-12 transition-colors duration-200",
              isDragging ? "bg-indigo-50/50" : "bg-white"
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className={cn(
              "absolute inset-4 rounded-2xl border-2 border-dashed transition-colors duration-200 pointer-events-none",
              isDragging ? "border-indigo-400 bg-indigo-50/20" : "border-gray-200"
            )} />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-8 ring-indigo-50/50">
                <Upload className="h-10 w-10" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Upload an image</h3>
              <p className="mb-8 text-gray-500 max-w-sm">
                Drag and drop your image here, or click to browse. Supported formats: PNG, JPG, JPEG, WEBP.
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                className="hidden"
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95 flex items-center gap-2"
              >
                Choose Image
              </button>
              
              <p className="mt-4 text-xs font-medium text-gray-400">
                Max file size: 10MB
              </p>
            </div>
          </div>
        )}

        {/* State: Preview */}
        {state === 'preview' && previewUrl && (
          <div className="flex-1 flex flex-col p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start h-full">
              {/* Image Preview Container */}
              <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center min-h-[300px] relative">
                <img 
                  src={previewUrl} 
                  alt="Upload preview" 
                  className="max-h-[500px] w-auto object-contain"
                />
              </div>
              
              {/* Action Panel */}
              <div className="w-full md:w-80 flex flex-col gap-6 shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to process</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ImageIcon className="h-4 w-4" />
                    <span className="truncate max-w-[200px]" title={file?.name}>{file?.name}</span>
                  </div>
                  {dimensions && (
                    <p className="text-xs text-gray-400 mt-1">
                      {dimensions.width} &times; {dimensions.height} px
                    </p>
                  )}
                </div>
                
                <div className="space-y-3 mt-auto">
                  <button 
                    onClick={handleRemoveBackground}
                    className="w-full rounded-full bg-indigo-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    Remove Background <Wand2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all active:scale-95"
                  >
                    Choose Another Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State: Processing */}
        {state === 'processing' && previewUrl && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            {/* Background blurred image */}
            <div 
              className="absolute inset-0 opacity-20 blur-xl scale-110 pointer-events-none bg-cover bg-center"
              style={{ backgroundImage: `url(${previewUrl})` }}
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wand2 className="h-8 w-8 text-indigo-600 animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loadingTextIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {LOADING_TEXTS[loadingTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </h3>
              <p className="text-gray-500 text-center max-w-xs">
                Our AI is precisely masking the subject and removing the background. This usually takes just a few seconds.
              </p>
            </div>
          </div>
        )}

        {/* State: Result */}
        {state === 'result' && previewUrl && resultUrl && (
          <div className="flex-1 flex flex-col p-6 sm:p-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-6 items-center w-full min-h-[350px]">
                {/* Original */}
                <div className="flex-1 w-full rounded-2xl overflow-hidden bg-gray-50 ring-1 ring-gray-200 relative flex flex-col h-full">
                  <div className="absolute top-4 left-4 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-gray-700 shadow-sm">
                    Original
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4">
                    <img 
                      src={previewUrl} 
                      alt="Original" 
                      className="max-h-[400px] w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 z-10 -mx-11">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                
                {/* Result */}
                <div className="flex-1 w-full rounded-2xl overflow-hidden ring-1 ring-gray-200 relative flex flex-col h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz4KPC9zdmc+')] bg-repeat">
                  <div className="absolute top-4 left-4 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-indigo-700 shadow-sm flex items-center gap-1.5">
                    <Wand2 className="h-3 w-3" /> Result
                  </div>
                  <div className="flex-1 flex items-center justify-center p-4 relative z-0">
                    <img 
                      src={resultUrl} 
                      alt="Background removed" 
                      className="max-h-[400px] w-auto object-contain drop-shadow-2xl"
                    />
                    
                    {/* Result image - no fake simulated banner anymore */}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
                <button 
                  onClick={reset}
                  className="w-full sm:w-auto rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> Remove Another
                </button>
                <a 
                  href={resultUrl}
                  download={file ? `${file.name.replace(/\.[^/.]+$/, "")}-no-background.png` : 'remova-result.png'}
                  className="w-full sm:w-auto rounded-full bg-indigo-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download HD
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
