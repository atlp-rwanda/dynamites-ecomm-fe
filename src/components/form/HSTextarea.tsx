import React from 'react';

interface MyTextareaProps {
  id?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  value?: string;
  style?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const HSTextarea: React.FC<MyTextareaProps> = ({
  id,
  name,
  onBlur,
  value,
  style,
  label,
  onChange,
  placeholder,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`${style} text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px] group-hover:border-grayDark px-5 py-3`}
    />
  );
};

export default HSTextarea;
