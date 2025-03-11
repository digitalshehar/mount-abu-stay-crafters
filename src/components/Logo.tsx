import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-sm">
      <img src="public/images/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
    </div>
  );
};

export default Logo;
