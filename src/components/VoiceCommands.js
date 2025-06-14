// VoiceCommands.js
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const speakText = (text) => {
  try {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported');
    }
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
};

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = () => {
  return SpeechRecognition.browserSupportsSpeechRecognition();
};

export const useVoiceCommands = () => {
  const commands = [
    {
      command: 'go to *',
      callback: (section) => {
        console.log('Voice command triggered: go to', section);
        const lowerSection = section.toLowerCase();
        if (lowerSection.includes('home')) {
          console.log('Navigating to home');
          speakText('Navigating to home page');
          window.location.href = '/';
        } else if (lowerSection.includes('blog')) {
          console.log('Navigating to blog');
          speakText('Navigating to blog');
          window.location.href = '/blog';
        } else if (lowerSection.includes('product')) {
          console.log('Navigating to products');
          speakText('Navigating to products');
          window.location.href = '/products';
        } else if (lowerSection.includes('expert')) {
          console.log('Navigating to experts');
          speakText('Navigating to experts');
          window.location.href = '/experts';
        } else if (lowerSection.includes('library')) {
          console.log('Navigating to library');
          speakText('Navigating to library');
          window.location.href = '/library';
        } else if (lowerSection.includes('contact')) {
          console.log('Navigating to contact');
          speakText('Navigating to contact us');
          window.location.href = '/contact-us';
        } else if (lowerSection.includes('terms')) {
          console.log('Navigating to terms');
          speakText('Navigating to terms');
          window.location.href = '/terms';
        } else if (lowerSection.includes('login')) {
          console.log('Navigating to login');
          speakText('Navigating to login');
          window.location.href = '/login';
        } else {
          console.log('Unknown navigation target:', section);
          speakText(`Sorry, I don't know how to navigate to ${section}`);
        }
      }
    },
    {
      command: 'search *',
      callback: (query) => {
        console.log('Voice command triggered: search', query);
        speakText(`Searching for ${query}`);
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    },
    {
      command: 'help',
      callback: () => {
        console.log('Voice command triggered: help');
        speakText('You can say "go to" followed by home, blog, products, experts, library, contact, terms, or login. You can also say "search" followed by your query.');
      }
    }
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands });

  const startListening = () => {
    console.log('Starting speech recognition...');
    try {
      SpeechRecognition.startListening({ 
        continuous: true, 
        language: 'en-US',
        interimResults: false
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  // Debug transcript changes
  React.useEffect(() => {
    if (transcript) {
      console.log('Transcript updated:', transcript);
    }
  }, [transcript]);

  // Debug listening state changes
  React.useEffect(() => {
    console.log('Listening state changed:', listening);
  }, [listening]);

  return {
    transcript,
    listening,
    startListening,
    resetTranscript
  };
};
