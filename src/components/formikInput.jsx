// File: src/components/form/FormikInput.jsx
import  { useState } from 'react';
import { useField } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function FormikInput({ label, name, type = 'text', placeholder, icon: Icon, ...props }) {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4 relative">
      {label && <label htmlFor={name} className="block text-start mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          id={name}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" />}
        {isPassword && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-start text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}

export default FormikInput;
