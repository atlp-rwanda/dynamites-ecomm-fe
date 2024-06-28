import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProducts, search } from '@/app/slices/ProductSlice';
import Categories from './sidebar';
import Header from './header';
import ProductsList from './productList';
import HSButton from '../form/HSButton';
import { Category } from '@/types/Product';
import {
  fetchCategories,
  selectCategories,
  getFocused,
} from '@/app/slices/categorySlice';
import { RootState } from '@/app/store';

function CategoriesSection() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories: Category[] = useAppSelector((state: RootState) =>
    selectCategories(state)
  );
  const focused: number = useAppSelector((state: RootState) =>
    getFocused(state)
  );
  const chosen = categories.find((category) => category.id === focused);
  const title = chosen?.name;

  return (
    <div
      className="flex flex-col mx-0"
      style={{
        fontFamily:
          'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif',
      }}
    >
      <Header />
      <div className="p-0 m-0 md:pl-8 md:mx-8">
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-1/4">
            <Categories />
          </aside>
          <main className="w-full md:w-3/4 p-4 flex flex-col  gap-6">
            <div className="hidden md:flex justify-between gap-12">
              <div className="flex gap-2 w-full items-center bg-gray-100 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx={11} cy={11} r={6} />
                    <path
                      strokeLinecap="round"
                      d="M11 8a3 3 0 0 0-3 3m12 9l-3-3"
                    />
                  </g>
                </svg>
                <input
                  onChange={(e) => dispatch(search(e.target.value))}
                  id="searchInput"
                  placeholder="Search"
                  type="text"
                  className="w-full outline-none bg-gray-100 placeholder:text-gray-400 font-light"
                />
              </div>
              <HSButton
                title="Search"
                onClick={() =>
                  dispatch(
                    search(
                      (
                        document.getElementById(
                          'searchInput'
                        ) as HTMLInputElement
                      ).value
                    )
                  )
                }
              />
            </div>
            <div className="flex md:hidden w-full">
              <input
                placeholder="Search"
                type="text"
                className="w-full outline-none placeholder:text-gray-400 text-xl font-thin"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 p-2 rounded-lg text-white bg-indigo-700"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={11} cy={11} r={6} />
                  <path
                    strokeLinecap="round"
                    d="M11 8a3 3 0 0 0-3 3m12 9l-3-3"
                  />
                </g>
              </svg>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <h1 className="font-semibold text-2xl tracking-wide">
                  {title || 'New Arrivals'}
                </h1>
                <span className="text-gray-600 font-light text-center">
                  Dont miss this opportunity at a special discount just for this
                  week.
                </span>
              </div>
              <div className="hidden md:flex rounded-xl px-4 py-2 text-sm gap-2 items-center text-indigo-700 border-indigo-700 border cursor-pointer hover:bg-indigo-100 hover:text-indigo-800">
                <span>View All</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#2196f3"
                    d="M17.1 5L14 8.1L29.9 24L14 39.9l3.1 3.1L36 24z"
                  />
                </svg>
              </div>
            </div>
            <ProductsList
              focused={focused === -1 ? 'all' : categories[focused].name}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSection;
