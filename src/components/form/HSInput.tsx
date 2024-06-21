interface MyInputProps {
  id?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlurTextArea?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  values?: string | number;
  style?: string;
  label?: string;
  labelStyle?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  text?: string;
  icon?: JSX.Element;
  isRequired?: boolean;
}

function HSInput({
  id,
  onBlur,
  onBlurTextArea,
  values,
  style,
  label,
  labelStyle,
  onChange,
  onChangeTextArea,
  placeholder,
  type,
  text,
  icon,
  isRequired,
}: MyInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <h1 className={`text-sm sm:text-md font-medium ${labelStyle}`}>
        {label}
      </h1>
      {type === 'input' ? (
        <div
          className={`${style} relative bg-grayLight text-black  duration-100 outline-none justify-between flex items-center gap-1 px-3 w-full rounded-md font-light  group-hover:border-grayDark`}
        >
          {icon && <p>{icon}</p>}
          <input
            type={text}
            value={values}
            onBlur={onBlur}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full h-full bg-transparent py-3 outline-none"
            required={isRequired}
          />
        </div>
      ) : (
        <textarea
          id={id}
          onBlur={onBlurTextArea}
          cols={30}
          rows={10}
          placeholder={placeholder}
          onChange={onChangeTextArea}
          value={values}
          className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
          required={isRequired}
        >
          {values}
        </textarea>
      )}
    </div>
  );
}

export default HSInput;
