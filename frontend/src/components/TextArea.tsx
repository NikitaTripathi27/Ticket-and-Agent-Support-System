import React from "react";
type TextAreaProps = {
  id: string;

  name: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  value: string;
  onChange: (e: string) => void;
};
const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  errorMessage,
  value,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col ">
      <label className="text-gray-900 mb-1 ml-1 font-medium" htmlFor={id}>
        {label}
      </label>
      <textarea
        rows={5}
        id={id}
        name={name}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
        className="w-full mt-1 mb-1 border border-gray-300 rounded-lg px-2 py-3 outline-0 focus:ring-1 focus:ring-blue-600 placeholder:text-gray-900"
      />  
      {errorMessage && (
        <small className="text-red-600 ml-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default TextArea;
