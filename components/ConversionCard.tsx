'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedFormats: string;
}

export default function ConversionCard({
  title,
  description,
  icon,
  acceptedFormats,
}: ConversionCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsComplete(false);
    }
  };

  const handleConvert = () => {
    if (!file) return;

    setIsConverting(true);

    setTimeout(() => {
      setIsConverting(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setIsComplete(false);
    setIsConverting(false);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          {isComplete && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm md:text-base">{description}</p>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="file"
              accept={acceptedFormats}
              onChange={handleFileChange}
              className="hidden"
              id={`file-${title}`}
              disabled={isConverting}
            />
            <label
              htmlFor={`file-${title}`}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                file
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-gray-50'
              } ${isConverting ? 'pointer-events-none opacity-50' : ''}`}
            >
              {file ? (
                <>
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium text-gray-900 text-center break-all">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Click to upload
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {acceptedFormats.replace(/\./g, '').toUpperCase()}
                  </span>
                </>
              )}
            </label>
          </div>

          {file && !isComplete && (
            <Button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full bg-primary hover:bg-blue-700 shadow-lg"
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                'Convert to PDF'
              )}
            </Button>
          )}

          {isComplete && (
            <div className="space-y-2">
              <Button className="w-full bg-green-500 hover:bg-green-600 shadow-lg">
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full border-2"
              >
                Convert Another File
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
