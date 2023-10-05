import React, { useEffect, useState } from 'react';

const GoogleTranslate = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Google Translate Element
    window.googleTranslateElementInit = () => {
      setLoading(false); // Set loading to false when translation is initialized

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,es,ar,ru,pt,de,bg,hr,cs,da,nl,et,fi,fr,el,hu,ga,it,lv,lt,mt,pl,pt,ro,sk,sl,sv,ja,zh-CN,tr,vi',
        }, // Include selected languages
        'google_translate_element'
      );
    };

    // Load Google Translate API
    const addGoogleTranslateScript = document.createElement('script');
    addGoogleTranslateScript.async = true;
    addGoogleTranslateScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(addGoogleTranslateScript);

    return () => {
      // Clean up the added script when the component is unmounted
      document.body.removeChild(addGoogleTranslateScript);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p style={{fontSize: '0.6rem'}}>...</p>
      ) : (
        <div id="google_translate_element"></div>
      )}
    </div>
  );
};

export default GoogleTranslate;
