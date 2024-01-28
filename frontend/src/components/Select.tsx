import React from "react";
import { TOptions } from "../types";
type TSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: TOptions[];
  placeholder: string;
};
const Select: React.FC<TSelectProps> = ({
  value,
  setValue,
  options,
  placeholder,
}) => {
  return (
    <select 
      value={value}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        setValue(event.target.value)
      }
      className="border border-gray-300 rounded h-10 px-2 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map(({ value: option, label }: TOptions) => (
        <option value={option} key={label}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
