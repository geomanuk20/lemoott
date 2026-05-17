import React, { useState, useEffect } from 'react';
import FrontendNavbar from './FrontendNavbar';
import FrontendSidebar from './FrontendSidebar';
import FrontendFooter from './FrontendFooter';

const FrontendLayout = ({ children, isTransparent = true, showFooter = true, showHeader = true, hideNavElements = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/movies');
        const data = await res.json();
        setMovies(Array.isArray(data) ? data.filter(m => m.status === 'Active') : []);
      } catch (err) {
        console.error('Error fetching search data:', err);
      }
    };

    const fetchSettings = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/general-settings');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };

    fetchSearchData();
    fetchSettings();
  }, []);

  return (
    <div className="frontend-wrapper">
      {showHeader && (
        <FrontendNavbar 
          isTransparent={isTransparent}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          movies={movies}
          settings={settings}
          hideNavElements={hideNavElements}
        />
      )}
  
      {showHeader && (
        <FrontendSidebar 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          settings={settings}
        />
      )}

      <main className="fe-main-content">
        {children}
        {showFooter && <FrontendFooter settings={settings} />}
      </main>


      <style dangerouslySetInnerHTML={{ __html: `
        .frontend-wrapper { background: #050505; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; position: relative; }
        .fe-main-content { position: relative; z-index: 10; }
      ` }} />
    </div>
  );
};

export default FrontendLayout;
