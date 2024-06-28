interface CategoryProps {
  icon: string;
  name: string;
}

export default function CategoryComponent({ icon, name }: CategoryProps) {
  return (
    <div
      className="flex gap-2 text-xl text-gray-600 tracking-wider cursor-pointer"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <img
        src={
          icon.startsWith('/') || icon.startsWith('https')
            ? icon
            : '/src/assets/icons/categories.svg'
        }
        alt="icon"
      />
      <span>{name}</span>
    </div>
  );
}
