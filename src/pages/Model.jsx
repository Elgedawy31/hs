import React, { useState } from 'react';
import UniUploadDoc from '../components/UniUploadDoc';
import UniBtn from '../components/UniBtn';
import { Camera, AlertTriangle, Clock } from 'lucide-react';
import model1Img from '../assets/Images/model-1.jpg';
import model2Img from '../assets/Images/model-2.png';

function Model() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data for previous diagnoses
  const previousDiagnoses = [
    {
      id: 1,
      image: model1Img,
      date: '3 days ago',
      confidence: '92% Confidence',
      diagnosis: 'Possible Acne',
      recommendation: 'Consultation recommended for proper treatment plan'
    },
    {
      id: 2,
      image: model2Img,
      date: '3 days ago',
      confidence: '92% Confidence',
      diagnosis: 'Possible Eczema',
      recommendation: 'Consultation recommended for proper treatment plan'
    }
  ];

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  const handleAnalyze = () => {
    if (uploadedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis with a timeout
    setTimeout(() => {
      setAnalysisResult({
        diagnosis: 'Eczema',
        confidence: '86%',
        recommendation: 'Based on the AI analysis, we recommend consulting a dermatologist for confirmation and proper treatment plan.'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleTakePhoto = () => {
    // This would typically open the camera
    console.log('Opening camera...');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text">AI Skin Diagnosis</h1>
        <p className="text-hoverText max-w-2xl mx-auto">
          Upload an image of your skin condition, and our AI will analyze it to provide a possible diagnosis.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-background rounded-lg border border-borderColor p-6 mb-8">
        <UniUploadDoc
          title=""
          fileType="images"
          onFilesChange={handleFilesChange}
          maxFiles={1}
          description="Drag and drop your files here, or click to browse"
        //   showFileList={false}
          className="mb-4"
        />
        
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mb-12">
        <UniBtn 
          text="Analyze Image" 
          className="text-white px-10 py-3"
          loading={isAnalyzing}
          disabled={uploadedFiles.length === 0 || isAnalyzing}
          onClick={handleAnalyze}
        />
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-text">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-background/50 p-6 rounded-lg">
              <h3 className="text-placeholderText mb-2">Possible Diagnosis</h3>
              <p className="text-primary font-semibold">{analysisResult.diagnosis}</p>
            </div>
            
            <div className="bg-background/50 p-6 rounded-lg">
              <h3 className="text-placeholderText mb-2">Confidence Level</h3>
              <p className="text-primary font-semibold">{analysisResult.confidence}</p>
            </div>
          </div>
          
          <div className="bg-background/50 p-6 rounded-lg mb-6">
            <h3 className="text-placeholderText mb-2">Doctor's Recommendation</h3>
            <p className="text-text">{analysisResult.recommendation}</p>
          </div>
          
          <div className="bg-background/50 p-6 rounded-lg border-l-4 border-primary flex items-start gap-3">
            <AlertTriangle className="text-primary flex-shrink-0 mt-1" />
            <p className="text-sm text-placeholderText">
              This AI diagnosis is not a substitute for professional medical consultation. Please consult a dermatologist for confirmation and proper treatment.
            </p>
          </div>
        </div>
      )}

      {/* Previous Diagnoses */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-text">Previous Diagnoses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previousDiagnoses.map((item) => (
            <div key={item.id} className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={item.image} 
                alt={item.diagnosis} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-placeholderText mb-3">
                  <Clock size={16} />
                  <span className="text-sm">{item.date}</span>
                  <span className="ml-auto text-sm text-primary">{item.confidence}</span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{item.diagnosis}</h3>
                <p className="text-sm text-placeholderText">{item.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Model;
