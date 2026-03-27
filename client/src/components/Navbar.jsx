import React from 'react';
import ThemeToggle from './ThemeToggle';
import { t } from '../translations';

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  language, 
  setLanguage, 
  isDark, 
  toggleTheme 
}) {

  // Landing Page Navbar (overlay style)
  if (currentPage === 'home') {
    return (
      <div className="landing-nav">
        <div className="language-toggle">
          <button 
            className={`lang-btn ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
          >
            eng
          </button>
          <button 
            className={`lang-btn ${language === 'gujarati' ? 'active' : ''}`}
            onClick={() => setLanguage('gujarati')}
          >
            ગુજ
          </button>
        </div>
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      </div>
    );
  }

  // App Page Navbar (toolbar style)
  return (
    <nav className="app-toolbar">
      <div className="toolbar-left">
        <button 
          className="app-brand" 
          onClick={() => setCurrentPage('home')}
        >
          {t('plantHealthAI', language)}
        </button>
        <div className="app-nav-links">
          <button 
            className={`nav-link ${currentPage === 'analysis' ? 'active' : ''}`}
            onClick={() => setCurrentPage('analysis')}
          >
            {t('scanPlant', language)}
          </button>
          <button 
            className={`nav-link ${currentPage === 'basic' ? 'active' : ''}`}
            onClick={() => setCurrentPage('basic')}
          >
            {t('basicCare', language)}
          </button>
          <button 
            className={`nav-link ${currentPage === 'seasonal' ? 'active' : ''}`}
            onClick={() => setCurrentPage('seasonal')}
          >
            {t('seasonalCare', language)}
          </button>
          <button 
            className={`nav-link ${currentPage === 'environmental' ? 'active' : ''}`}
            onClick={() => setCurrentPage('environmental')}
          >
            {t('environmentalData', language)}
          </button>
        </div>
      </div>
      
      <div className="toolbar-right">
        <div className="language-toggle">
          <button 
            className={`lang-btn ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
          >
            eng
          </button>
          <button 
            className={`lang-btn ${language === 'gujarati' ? 'active' : ''}`}
            onClick={() => setLanguage('gujarati')}
          >
            ગુજ
          </button>
        </div>
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
      </div>
    </nav>
  );
}
