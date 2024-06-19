import { Link } from 'react-router-dom';

interface MyButtonProps {
  path?: string;
  title: string;
  styles?: string;
  click?: () => void;
  icon?: JSX.Element;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onChange?: React.ChangeEventHandler<HTMLAnchorElement>;
}

function HSButton({
  path,
  click,
  title,
  icon,
  styles,
  target,
  onChange,
}: MyButtonProps) {
  return (
    <Link
      target={target}
      type="submit"
      onChange={onChange}
      rel="noopener noreferrer"
      to={path!}
      onClick={click}
      className={`${styles} bg-primary text-white px-6 py-3 rounded-md flex justify-center items-center gap-2 text-sm hover:text-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out`}
    >
      {title} {icon}
    </Link>
  );
}

export default HSButton;
