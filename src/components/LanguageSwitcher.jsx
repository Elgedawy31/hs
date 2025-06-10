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
      <div className="bg-body  rounded-lg shadow-lg border border-borderColor p-2">
        <div 
          id="google_translate_element" 
          className="language-switcher-container"
        ></div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
