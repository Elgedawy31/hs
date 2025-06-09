import { useEffect } from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src*="translate.google.com"]')) {
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,ar",
        layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        autoDisplay: false
      }, "google_translate_element");
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="fixed top-24 right-6 z-50">
      <div className="bg-body  rounded-lg shadow-lg border border-borderColor p-3 min-w-[160px]">
        <div className="flex items-center gap-2 mb-2">
          <svg 
            className="w-4 h-4 text-text " 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-text">
            Language
          </span>
        </div>
        <div 
          id="google_translate_element" 
          className="language-switcher-container"
        ></div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
