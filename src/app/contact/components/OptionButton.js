import React from 'react';

const OptionButton = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2 rounded-full border border-gray-600 text-sm transition-colors ${
        selected 
          ? 'bg-[#1e1e1e] text-[#deddd9]' 
          : 'bg-transparent text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-[#deddd9]'
      }`}
    >
      {label}
    </button>
  );
};

export default OptionButton;
