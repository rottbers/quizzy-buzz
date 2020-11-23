import React, { Fragment } from 'react';
import { capitalizeString } from '../utilities';

interface Props {
  name: string;
  options: string[];
  selected: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<Props> = ({ name, options, selected, onChange }) => {
  return (
    <div className="flex justify-between mt-2 rounded-md border-2 border-white w-full">
      {options.map((option, index) => (
        <Fragment key={option}>
          <input
            type="radio"
            name={name}
            id={`${name}-${option}`}
            value={option}
            checked={selected === option}
            onChange={onChange}
            className="h-0 w-0 absolute opacity-0"
          />
          <label
            htmlFor={`${name}-${option}`}
            className={`py-2 px-6 w-full border-white text-center select-none ${
              selected === option
                ? 'text-gray-900 bg-white focus:ring'
                : 'hover:cursor-pointer hover:text-gray-900 hover:bg-gray-200'
            } ${index === options.length - 1 ? 'border-r-0' : 'border-r-2'}`}
          >
            {capitalizeString(option)}
          </label>
        </Fragment>
      ))}
    </div>
  );
};

export default RadioGroup;
