import React from 'react';

interface MyInputProps {
  id?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  style?: string;
  label?: string;
  type?: string;
  text?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const HSInput: React.FC<MyInputProps> = ({
  id,
  name,
  onBlur,
  value,
  style,
  label,
  type,
  text,
  onChange,
  placeholder,
}) => {
  return (
    <input
      id={id}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      text={text}
      className={`${style} bg-grayLight text-black duration-100 outline-none justify-between flex items-center px-4 py-3 w-full rounded-md font-light mt-2 group-hover:border-grayDark`}
    />
  );
};

export default HSInput;
