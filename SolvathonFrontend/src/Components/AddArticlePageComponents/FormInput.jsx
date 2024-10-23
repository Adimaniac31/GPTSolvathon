import React from "react";

const FormInput = ({ id, label, value, onChange, type = "text", placeholder, rows }) => {
  return (
    <div className="mb-4">
      <label className="block text-primary-dark mb-2" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          required
          rows={rows}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};

export default FormInput;
