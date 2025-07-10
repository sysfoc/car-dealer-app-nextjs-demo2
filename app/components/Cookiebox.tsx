'use client';
import { getLocalStorage, setLocalStorage } from "../lib/storageHelper"
import { useState, useEffect } from 'react';

interface CookieboxProps {
  cookieConsent?: {
    message: string;
    buttonText: string;
    textColor: string;
    bgColor: string;
    buttonTextColor: string;
    buttonBgColor: string;
    status: 'active' | 'inactive';
  };
}

const Cookiebox = ({ cookieConsent: propsCookieConsent }: CookieboxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieboxProps["cookieConsent"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/general');
      const data = await response.json();

      if (data.settings && data.settings.cookieConsent) {
        setCookieConsent(data.settings.cookieConsent);
      } else {
        setCookieConsent(propsCookieConsent || {
          message: 'We Use Cookies',
          buttonText: 'Accept All',
          textColor: '#000000',
          bgColor: '#ffffff',
          buttonTextColor: '#ffffff',
          buttonBgColor: '#000000',
          status: 'active',
        });
      }
    } catch (error) {
      console.error('Failed to fetch cookie settings:', error);
      setCookieConsent(propsCookieConsent || {
        message: 'We Use Cookies',
        buttonText: 'Accept All',
        textColor: '#000000',
        bgColor: '#ffffff',
        buttonTextColor: '#ffffff',
        buttonBgColor: '#000000',
        status: 'active',
      });
    } finally {
      setIsLoading(false);
    }
  };

  fetchSettings();
}, [propsCookieConsent]);


  useEffect(() => {
    if (!isLoading) {
      const stored = getLocalStorage("cookie_consent", null);
      if (stored !== 'essential' && stored !== 'all' && cookieConsent?.status === 'active') {
        setIsVisible(true);
      }
    }
  }, [isLoading, cookieConsent?.status]);

const handleConsent = (value: 'essential' | 'all') => {
  setLocalStorage("cookie_consent", value);

  if (typeof window.gtag === 'function') {
    const analyticsValue = value === 'all' ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsValue,
      'ad_storage': analyticsValue
    });
  }

  setIsVisible(false);
  window.location.reload();
};

if (isLoading || !isVisible || !cookieConsent || cookieConsent.status === 'inactive') {
  return null;
}

  return (
    <section className="fixed bottom-3 right-3 z-10 shadow-lg flex">
      <div 
        className="w-[350px] rounded-md px-6 py-4"
        style={{
          backgroundColor: cookieConsent.bgColor,
          color: cookieConsent.textColor,
        }}
      >
        <h2 className="text-lg font-bold">
          {cookieConsent.message || 'We Use Cookies'}
        </h2>
        <p className="mt-2 text-sm opacity-80">
          We use cookies to enhance your experience. You can choose which ones to allow.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleConsent('essential')}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: cookieConsent.buttonBgColor,
              color: cookieConsent.buttonTextColor,
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.opacity = '1';
            }}
          >
            Only Essentials
          </button>
          <button
            type="button"
            onClick={() => handleConsent('all')}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: cookieConsent.buttonBgColor,
              color: cookieConsent.buttonTextColor,
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.opacity = '1';
            }}
          >
            {cookieConsent.buttonText || 'Accept All'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cookiebox;