import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface UploadStatus {
  type: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
}

export default function ResumeUpload() {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: 'idle' });
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a PDF or Word document (.pdf, .doc, .docx)'
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadStatus({
        type: 'error',
        message: 'File size must be less than 5MB'
      });
      return;
    }

    setSelectedFile(file);
    setUploadStatus({ type: 'idle' });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      setUploadStatus({
        type: 'error',
        message: 'Please select a file and make sure you are logged in'
      });
      return;
    }

    setUploadStatus({ type: 'uploading', message: 'Processing your resume...' });

    try {
      // Convert file to base64
      const fileReader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        fileReader.onload = () => {
          const result = fileReader.result as string;
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(selectedFile);
      });

      const base64Data = await base64Promise;

      // Create JSON payload with base64 data
      const payload = {
        user_email: user.email || '',
        user_id: user.id,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        upload_timestamp: new Date().toISOString(),
        resume_data: base64Data,
        resume_base64: `data:${selectedFile.type};base64,${base64Data}`
      };

      // Send to webhook
      const response = await fetch('https://hook.eu2.make.com/1jeljoecqqbihuwfx8el1fhl7fi5urft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      setUploadStatus({
        type: 'success',
        message: 'Resume uploaded successfully! Our AI will process it shortly.'
      });

      // Clear the selected file after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus({ type: 'idle' });
      }, 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Upload failed. Please try again.'
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full mb-4">
            <Upload className="h-5 w-5" />
            <span className="text-sm font-medium">Resume Upload</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your resume and let our AI analyze it to optimize your job search experience.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Drag and Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? 'border-black bg-gray-50'
                : selectedFile
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploadStatus.type === 'uploading'}
            />

            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedFile.name}
                  </h3>
                  <p className="text-gray-600">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadStatus({ type: 'idle' });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                  disabled={uploadStatus.type === 'uploading'}
                >
                  Choose a different file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Upload className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop your resume here, or click to browse
                  </h3>
                  <p className="text-gray-600">
                    Supports PDF, DOC, and DOCX files up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {uploadStatus.type !== 'idle' && (
            <div className={`mt-6 p-4 rounded-xl border-2 ${
              uploadStatus.type === 'success'
                ? 'bg-green-50 border-green-200'
                : uploadStatus.type === 'error'
                ? 'bg-red-50 border-red-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-3">
                {uploadStatus.type === 'uploading' && (
                  <Loader className="h-5 w-5 text-blue-600 animate-spin" />
                )}
                {uploadStatus.type === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {uploadStatus.type === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <p className={`font-medium ${
                  uploadStatus.type === 'success'
                    ? 'text-green-800'
                    : uploadStatus.type === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}>
                  {uploadStatus.message}
                </p>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && uploadStatus.type !== 'success' && (
            <div className="mt-8 text-center">
              <button
                onClick={handleUpload}
                disabled={uploadStatus.type === 'uploading'}
                className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium inline-flex items-center space-x-2"
              >
                {uploadStatus.type === 'uploading' ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload Resume</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our AI will analyze your resume to understand your skills and experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure Processing</h3>
            <p className="text-gray-600 text-sm">
              Your resume is processed securely and used only to improve your job matching.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Quick Upload</h3>
            <p className="text-gray-600 text-sm">
              Fast and easy upload process with support for multiple file formats.
            </p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Uploading as: <span className="font-medium">{user.email}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}