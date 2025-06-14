import React, { useState, useEffect } from 'react';
import { speakText, useVoiceCommands, isSpeechRecognitionSupported } from './VoiceCommands';
import SpeechRecognition from 'react-speech-recognition';

function VoiceDemo() {
  const { transcript, listening, startListening, resetTranscript } = useVoiceCommands();
  const [logs, setLogs] = useState([]);

  const testSpeech = () => {
    speakText("Hello! This is a test of the text to speech functionality.");
    addLog("Test speech triggered");
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), `[${timestamp}] ${message}`]);
    console.log(`[VoiceDemo] ${message}`);
  };

  const handleStartListening = () => {
    addLog("Starting voice recognition...");
    startListening();
  };

  const handleStopListening = () => {
    addLog("Stopping voice recognition...");
    resetTranscript();
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Monitor transcript changes
  useEffect(() => {
    if (transcript) {
      addLog(`Transcript: "${transcript}"`);
    }
  }, [transcript]);

  // Monitor listening state changes
  useEffect(() => {
    addLog(`Listening state: ${listening ? 'ON' : 'OFF'}`);
  }, [listening]);

  const demoCommands = [
    { command: 'go to home', description: 'Navigate to the home page' },
    { command: 'go to products', description: 'Navigate to the products page' },
    { command: 'go to blog', description: 'Navigate to the blog page' },
    { command: 'go to experts', description: 'Navigate to the experts page' },
    { command: 'go to library', description: 'Navigate to the library page' },
    { command: 'go to contact', description: 'Navigate to the contact us page' },
    { command: 'go to terms', description: 'Navigate to the terms page' },
    { command: 'go to login', description: 'Navigate to the login page' },
    { command: 'search react tutorials', description: 'Search for "react tutorials"' },
    { command: 'help', description: 'Get help with available commands' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Voice Commands Demo
      </h1>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">How to Use Voice Commands:</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Look for the 🎤 Voice button in the header</li>
          <li>Click the Voice button to start listening</li>
          <li>The button will turn red and show "Stop" when listening</li>
          <li>Speak one of the commands clearly</li>
          <li>The system will provide audio feedback and execute the command</li>
          <li>Click "Stop" or "Reset" to stop listening</li>
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Test Text-to-Speech:</h2>
        <button 
          onClick={testSpeech}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          🔊 Test Speech
        </button>
      </div>

      {/* Live Voice Recognition Testing */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
        <h2 className="text-2xl font-semibold mb-4 text-purple-800">Live Voice Recognition Test:</h2>
        
        <div className="flex gap-4 mb-4">
          <button 
            onClick={handleStartListening}
            disabled={listening}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              listening 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            🎤 Start Listening
          </button>
          
          <button 
            onClick={handleStopListening}
            disabled={!listening}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !listening 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            ⏹️ Stop Listening
          </button>

          <button 
            onClick={clearLogs}
            className="px-4 py-2 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            🗑️ Clear Logs
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-purple-700 mb-2">Current Status:</h3>
            <div className="bg-white p-3 rounded border">
              <p><strong>Listening:</strong> <span className={listening ? 'text-green-600' : 'text-red-600'}>{listening ? 'YES' : 'NO'}</span></p>
              <p><strong>Current Transcript:</strong> <span className="text-blue-600">"{transcript || 'None'}"</span></p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-700 mb-2">Debug Logs:</h3>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm h-32 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-purple-100 rounded">
          <p className="text-sm text-purple-700">
            <strong>Instructions:</strong> Click "Start Listening", then say "go to home" or any other command. 
            Watch the logs and console for debugging information.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Voice Commands:</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {demoCommands.map((cmd, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-mono text-sm bg-gray-100 px-3 py-2 rounded mb-2 text-blue-600">
                "{cmd.command}"
              </div>
              <p className="text-gray-600 text-sm">{cmd.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
        <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
          <li>Make sure your browser allows microphone access</li>
          <li>Speak clearly and at a normal pace</li>
          <li>The system works best in quiet environments</li>
          <li>Commands are case-insensitive</li>
          <li>You can say "help" anytime to hear available commands</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
        <h3 className="font-semibold text-green-800 mb-2">Examples:</h3>
        <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
          <li>Say: "go to home" → Navigates to homepage</li>
          <li>Say: "search medical advice" → Searches for medical advice</li>
          <li>Say: "go to products" → Goes to products page</li>
          <li>Say: "help" → Lists all available commands</li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceDemo;
