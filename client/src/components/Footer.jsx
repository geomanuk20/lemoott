import React from 'react';

const Footer = () => {
  return (
    <footer className="admin-footer">
      <p>Copyright © 2026 <span className="highlight">Video.com</span>. All Rights Reserved.</p>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-footer {
          text-align: center;
          padding: 30px 0;
          border-top: 1px solid #222;
          color: #888;
          font-size: 1rem;
          margin-top: 40px;
          background-color: transparent;
          width: 100%;
        }

        .admin-footer .highlight {
          color: #0066ff;
          font-weight: 500;
          cursor: pointer;
        }

        .admin-footer .highlight:hover {
          text-decoration: underline;
        }
      ` }} />
    </footer>
  );
};

export default Footer;
