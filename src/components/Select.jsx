import React, { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ options, defaultOption = null, label, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          ref={ref}
          defaultValue={defaultOption}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
        >
          {options?.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
