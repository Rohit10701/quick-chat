import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

interface FooterInputProps {
  chatInputHandler: (value: string) => void;
  defaultValue: string;
}

const FooterInput = ({ chatInputHandler, defaultValue }: FooterInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | null, isClicked : boolean) => {
    if (e?.key === 'Enter' || isClicked) {
      chatInputHandler(inputValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='w-full flex'>
      <input 
        type="text"
        className='w-full h-10 pl-7 pr-1 py-1 flex rounded-md dark:border-smoke border-graphite border-[1px]'
        onChange={handleChange}
        onKeyDown={e => handleKeyDown(e, false)}
        value={inputValue}
      />
      <div className='text-[2rem] px-4 flex justify-center items-center'>
        {inputValue ?  
        <button onClick={() => handleKeyDown(null, true)}>
          <IoSend /> 
        </button>
        
        : null}
      </div>

    </div>
  );
};

export default FooterInput;
