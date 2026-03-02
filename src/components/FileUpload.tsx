import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string, fileType: 'xml' | 'csv') => void;
  isLoading?: boolean;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  isLoading = false, 
  error 
}) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileType = file.name.toLowerCase().endsWith('.xml') ? 'xml' : 'csv';
      onFileUpload(content, fileType);
    };
    reader.readAsText(file);
  }, [onFileUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileType = file.name.toLowerCase().endsWith('.xml') ? 'xml' : 'csv';
      onFileUpload(content, fileType);
    };
    reader.readAsText(file);
  }, [onFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isLoading 
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
            : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 cursor-pointer'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept=".xml,.csv"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isLoading ? 'Processing...' : 'Upload Green Button Data'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            Drag and drop your XML or CSV file here, or click to browse
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              XML
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              CSV
            </div>
          </div>
        </label>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Supported Formats:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Green Button XML files (standard format)</li>
          <li>• CSV files with date, duration, and value columns</li>
          <li>• Energy usage data in kWh</li>
        </ul>
      </div>
    </div>
  );
};
