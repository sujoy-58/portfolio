import React from 'react';

const InputField = ({
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  error = false,
}) => {
  return (
    <div className="w-full ">
      <label className="block mb-2 text-sm font-second font-semibold opacity-85">
        {label} {required && <span className='text-red-500'>*</span>}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-[#1e1e1e]'} focus:border-gray-500 outline-none py-2 transition-colors` }
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-[#1e1e1e]'} focus:border-gray-500 outline-none py-2 transition-colors`}
        />
      )}
    </div>
  );
};

export default InputField;
