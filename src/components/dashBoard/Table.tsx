import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmationCard from './ConfirmationCard';
import CircularPagination from './NavigateonPage';
import { AppDispatch, RootState } from '../../app/store';
import { fetchDashboardProduct } from '@/features/Dashboard/dashboardProductsSlice';

interface Column {
  Header: string;
  accessor: string;
}

interface Column {
  Header: string;
  accessor: string;
}

const columns: Column[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'IMAGE', accessor: 'image' },
  { Header: 'TITLE', accessor: 'title' },
  { Header: 'QUANTITY', accessor: 'quantity' },
  { Header: 'PRICE', accessor: 'price' },
  { Header: 'DATE', accessor: 'date' },
  { Header: 'CATEGORY', accessor: 'category' },
  { Header: 'ACTION', accessor: 'action' },
];

function Table() {
  const dispatch: AppDispatch = useDispatch();

  const { DashboardProduct, status } = useSelector(
    (state: RootState) => state.DeshboardProducts
  );

  const data = [...DashboardProduct];

  useEffect(() => {
    dispatch(fetchDashboardProduct());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  // -----------------------------------------------------------
  const [isDeleteModalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemToselected] = useState<number | null>(null);
  const [mode, setmode] = useState('');
  // ---------------------------------------------------

  const handleDelete = (id: number) => {
    setItemToselected(id);
    setmode('delete');
    setModalVisible(true);
  };
  // -----------------------------------

  const handleUpdate = (id: number) => {
    setItemToselected(id);
    setmode('update');
    setModalVisible(true);
  };
  // -----------------------------------

  const confirmDelete = () => {
    if (itemSelected !== null) {
      // Logic to delete the item
    }
    setModalVisible(false);
  };
  // ---------------------------------------

  const confirmUpdate = () => {
    if (itemSelected !== null) {
      // Logic to update the item
    }
    setModalVisible(false);
  };
  // ----------------------------------------

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" min-w-full min-h-full pr-[15px] pl-[25px] pt-[35px]">
      <table className="min-w-full min-h-full">
        <thead className=" text-[12px] leading-[26px]">
          <tr className="bg-[#F5F6F6] rounded-[10px]">
            {columns.map((column, index) => (
              <th
                key={column.Header}
                className={` px-4 text-left text-grey text-[12px] leading-[26px] hover:scale-105 hover:border hover:border-primary ${
                  index === 0 ? 'rounded-tl-lg rounded-bl-lg' : ''
                } ${index === columns.length - 1 ? 'rounded-tr-lg rounded-br-lg' : ''}`}
              >
                {column.Header}
              </th>
            ))}
          </tr>
          <tr className="h-[20px]"></tr>
        </thead>

        <tbody className="">
          {status === 'loading' &&
            Array(6)
              .fill(null)
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-b-[2.5px] min-w-full h-[60px]  border-[#F5F6F6] last:border-none"
                >
                  <td key="ID" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg h-[40px]"></div>
                  </td>
                  <td key="image" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg h-[40px]"></div>
                  </td>
                  <td key="title" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                  <td key="quintity" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                  <td key="price" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                  <td key="date" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                  <td key="category" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                  <td key="action" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px]"></div>
                  </td>
                </tr>
              ))}
          {status === 'failed' &&
            Array(8)
              .fill(null)
              .map((_, index) => (
                <tr
                  key={index}
                  className="border-b-[2.5px] min-w-full h-[60px]  border-[#F5F6F6] last:border-none"
                >
                  <td key="ID" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="image" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="title" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="quintity" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="price" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="date" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-pretty">
                      Failed..
                    </div>
                  </td>
                  <td key="category" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                  <td key="action" className="">
                    <div className="shadow-lg animate-pulse bg-slate-300 rounded-lg  h-[40px] text-center">
                      Failed..
                    </div>
                  </td>
                </tr>
              ))}
          {status === 'succeeded' &&
            paginatedData.map((product, index) => (
              <tr
                key={index}
                className=" h-[68px] text-grey leading-[16px] text-[12px] font-normal border-b-[2px] border-[#F5F6F6] last:border-none hover:translate-x-[0.7px] hover:border hover:bg-[#F5F6F6]"
              >
                <td key="ID" className="px-4">
                  {product.id}
                </td>
                <td key="image" className="px-4 py-2">
                  <img
                    src={product.image}
                    alt="product"
                    className="h-[46px] w-[59px] object-cover"
                  />
                </td>
                <td key="title" className="px-4">
                  {product.name}
                </td>
                <td key="quintity" className="px-4">
                  {product.quantity}
                </td>
                <td key="price" className="px-4">
                  ${product.regularPrice}
                </td>
                <td key="date" className="px-4">
                  {product.updatedAt.slice(0, 10)}
                </td>
                <td key="category" className="px-4">
                  {product.category.name}
                </td>
                <td key="action" className="px-4">
                  <div className="flex flex-row justify-start">
                    <div className=" h-[36px] w-[36px] rounded-full flex items-center justify-center hover:border-primary hover:border ">
                      <MdOutlineEdit
                        type="button"
                        className=" text-textBlack cursor-pointer  h-[18px] w-[18px]"
                        onClick={() => handleUpdate(product.id)}
                      />
                    </div>
                    <div className="h-[36px] w-[36px] rounded-full flex items-center justify-center hover:border-primary hover:border ">
                      <FaRegTrashAlt
                        type="button"
                        className="text-red-500 cursor-pointer h-[16px] w-[16px]"
                        onClick={() => handleDelete(product.id)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className=" flex flex-row justify-end pb-[2%] pt-[5%] pr-[5%]">
        <CircularPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {mode === 'delete' && (
        <div className="">
          <ConfirmationCard
            isVisible={isDeleteModalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={confirmDelete}
            message="Are you sure you want to delete this item?"
          />
        </div>
      )}

      {mode === 'update' && (
        <div className="">
          <ConfirmationCard
            isVisible={isDeleteModalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={confirmUpdate}
            message="Are you sure you want to Update this item ?"
          />
        </div>
      )}
    </div>
  );
}

export default Table;
