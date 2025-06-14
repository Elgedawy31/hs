import React from 'react';
import VoiceDemo from '../components/VoiceDemo';
import SEO from '../components/SEO';

function VoiceDemoPage() {
  return (
    <>
      <SEO 
        title="Voice Commands Demo - HS"
        description="Learn how to use voice commands for hands-free navigation"
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <VoiceDemo />
      </div>
    </>
  );
}

export default VoiceDemoPage;
