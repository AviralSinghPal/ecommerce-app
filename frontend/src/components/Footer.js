import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>© {new Date().getFullYear()} Glamazon. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem 0',
  textAlign: 'center',
};

const textStyle = {
  margin: 0,
};

export default Footer;
