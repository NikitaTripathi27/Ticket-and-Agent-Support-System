import React from "react";
type InputProps = {
  id: string;
  type?: string;
  name: string;
  label: string;
  errorMessage?: string;
  value: string;
  onChange: (e: string) => void;
};
const Input: React.FC<InputProps> = ({
  id,
  type = "text",
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
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        className={`w-full border ${errorMessage?"border-red-600 focus:ring-red-600":"border-gray-300 focus:ring-blue-600"} rounded-lg px-2 py-3 outline-0 focus:ring-1  placeholder:text-gray-900`}     />
      {errorMessage && (
        <small className="text-red-600 ml-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default Input;
