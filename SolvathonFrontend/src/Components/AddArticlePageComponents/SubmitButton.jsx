import React from "react";

const SubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-primary-dark text-white py-2 rounded-lg hover:bg-primary-darkest transition-all"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
