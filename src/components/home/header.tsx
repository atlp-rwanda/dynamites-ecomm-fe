import Item from './headerItem';

interface HeaderItem {
  image: string;
  title: string;
  description: string;
  key: number;
}

const headerItems: HeaderItem[] = [
  {
    image: '/src/assets/icons/icon1.svg',
    title: 'Free Shipping',
    description: 'Free shipping on all orders',
    key: 1,
  },
  {
    image: '/src/assets/icons/icon4.svg',
    title: 'Online Support 24/7',
    description: 'Support online 24 hours a day',
    key: 2,
  },
  {
    image: '/src/assets/icons/icon3.svg',
    title: 'Money Return',
    description: 'Back guarantee under 7 days',
    key: 3,
  },
  {
    image: '/src/assets/icons/icon2.svg',
    title: 'Member Discount',
    description: 'On every order over $20.00',
    key: 4,
  },
];

export default function Header() {
  return (
    <header
      className="bg-white py-4 mx-0 md:mx-16"
      style={{
        fontFamily:
          'Lexend, Manrope, Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif',
      }}
    >
      <div className="mx-auto p-4 flex flex-col md:flex-row justify-between gap-4 md:items-center">
        {headerItems.map((item) => (
          <Item key={item.key} item={item} />
        ))}
      </div>
    </header>
  );
}
