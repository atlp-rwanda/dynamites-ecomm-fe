import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  ChevronLeft,
  ChevronRight,
  Power,
  RefreshCcw,
  Search,
} from 'lucide-react';
import PuffLoader from 'react-spinners/PuffLoader';
import { RootState, AppDispatch } from '@/app/store';
import { fetchProducts } from '@/app/Dashboard/AllProductSlices';
import { fetchBuyers } from '@/app/Dashboard/buyerSlice';
import Button from '@/components/form/Button';

import { showErrorToast, showSuccessToast } from '@/utils/ToastConfig';

interface Vendor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  status: string;
  updatedAt: string;
}

function Seller() {
  const dispatch = useDispatch<AppDispatch>();
  const { buyers, status } = useSelector((state: RootState) => state.buyer);
  const { allProducts } = useSelector((state: RootState) => state.products);

  const [numberofItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearch] = useState('');
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [reRenderTrigger, setReRenderTrigger] = useState(false);

  const [clickedVendor, setClickedVendor] = useState<Vendor | null>(null);
  const [deactivate, setDeactivate] = useState(false);
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBuyers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredVendors(buyers.filter((v) => v.userType.name === 'Vendor'));
  }, [buyers, reRenderTrigger]);

  const vendors = filteredVendors;
  const TotalPages = Math.ceil(vendors.length / numberofItemPerPage);
  const pages = [...Array(TotalPages + 1).keys()].slice(1);
  const itemsOnNextPage = currentPage * numberofItemPerPage;
  const itemsOnPreviousPage = itemsOnNextPage - numberofItemPerPage;
  const visiblePage = vendors.slice(itemsOnPreviousPage, itemsOnNextPage);

  const HandleEdit = (vendor: Vendor | null) => {
    setDeactivate(true);
    setClickedVendor(vendor);
  };

  const HandleActive = (vendor: Vendor | null) => {
    setActivate(true);
    setClickedVendor(vendor);
  };

  const activateVendor = `${import.meta.env.VITE_BASE_URL}/activate/${clickedVendor?.id}`;

  const HandleActivate = (vendor: Vendor | null) => {
    if (vendor?.status !== 'active') {
      axios
        .put(activateVendor, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            showSuccessToast(`${vendor?.firstName} Activated Successfully`);
            setReRenderTrigger((prev) => !prev);
          } else {
            showErrorToast('Failed to Activate the vendor');
          }
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    } else {
      showErrorToast('User is Already Active');
    }
  };

  const updateVendorStatus = `${import.meta.env.VITE_BASE_URL}/deactivate/${clickedVendor?.id}`;

  const handleSuspend = (vendor: Vendor | null) => {
    if (vendor?.status !== 'inactive') {
      axios
        .put(updateVendorStatus, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            showSuccessToast(`${vendor?.firstName} Suspended Successfully`);
            setReRenderTrigger((prev) => !prev);
          } else {
            showErrorToast('Failed to Suspend the vendor');
          }
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    } else {
      showErrorToast('User is Already Inactive');
    }
  };

  const ItemCount = (vendorfirstName: string) => {
    return allProducts.filter(
      (product) => product.vendor.firstName === vendorfirstName
    ).length;
  };

  const DateFormat = (udpdatedAt: string) => {
    const date = new Date(udpdatedAt);
    return date.toLocaleDateString();
  };

  const HandleNext = () => {
    if (currentPage < TotalPages) setCurrentPage(currentPage + 1);
  };

  const HandlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const HandleSearch = (value: string) => {
    setSearch(value);
    if (value.trim() === '') {
      setFilteredVendors(buyers.filter((v) => v.userType.name === 'Vendor'));
    } else {
      setFilteredVendors(
        buyers
          .filter((v) => v.userType.name === 'Vendor')
          .filter((v) =>
            `${v.firstName} ${v.lastName} ${v.email}`
              .toLowerCase()
              .includes(value.toLowerCase())
          )
      );
    }
  };

  return (
    <div className="mt-8 text-md text-dashgreytext">
      {deactivate && (
        <div className="fixed w-screen h-screen flex items-center justify-center z-50 bg-black bg-opacity-50 top-0 left-0">
          <div className="w-80 h-48 bg-dashgrey rounded-lg">
            <div className="my-10 ml-5">
              Are you sure you want to suspend?
              <div className="flex justify-center my-1">
                {clickedVendor?.firstName}
              </div>
            </div>
            <div className="flex justify-around items-center">
              <Button
                title="Cancel"
                styles="w-28"
                onClick={() => setDeactivate(false)}
              />
              <Button
                title="Suspend"
                styles="w-28 bg-red-600"
                onClick={() => handleSuspend(clickedVendor)}
              />
            </div>
          </div>
        </div>
      )}

      {activate && (
        <div className="fixed w-screen h-screen flex items-center justify-center z-50 bg-black bg-opacity-50 top-0 left-0">
          <div className="w-80 h-48 bg-dashgrey rounded-lg">
            <div className="my-10 ml-5">
              Are you sure you want to activate?
              <div className="flex justify-center my-1 font-semibold text-primary">
                {clickedVendor?.firstName}
              </div>
            </div>
            <div className="flex justify-around items-center">
              <Button
                title="Cancel"
                styles="w-28"
                onClick={() => setActivate(false)}
              />
              <Button
                title="Activate"
                styles="w-28 bg-red"
                onClick={() => HandleActivate(clickedVendor)}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="md:flex md:gap-5">
          <div className="text-2xl font-medium">Sellers</div>
          <button
            type="button"
            className="border-[2px] border-primary text-primary px-[5px] py-[5px] rounded-md flex justify-center items-center gap-2 text-sm
                hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
          >
            Add Seller
          </button>
        </div>
        <div className="md:flex justify-between">
          <div className="flex gap-5 py-2">
            <p>All ({vendors.length})</p>
            <p className="text-primary">
              Approved ({vendors.filter((v) => v.status === 'active').length})
            </p>
            <p className="text-primary">
              Suspended ({vendors.filter((v) => v.status === 'inactive').length}
              )
            </p>
          </div>
          <div className="relative">
            <Search className="absolute w-5 left-2 top-2" />
            <input
              type="text"
              placeholder="Search Seller"
              className="rounded-lg pl-10 gap-2 py-2 focus:border-none focus:outline-none w-full border-2 border-[#9095A1]"
              value={searchTerm}
              onChange={(e) => HandleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        {status === 'loading' && (
          <div className="md:flex items-center justify-center">
            <PuffLoader
              color="#6D31ED"
              cssOverride={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <div className="bg-white pt-5 w-full rounded-xl">
          <div className="bg-dashgrey rounded-md flex justify-between mx-1 py-1 px-4 pr-2">
            <div className="font-semibold text-grey column-img">Image</div>
            <div className="font-semibold text-grey column-firstName">
              First Name
            </div>
            <div className="font-semibold text-grey column-lastName">
              Last Name
            </div>
            <div className="font-semibold text-grey column-email">Email</div>
            <div className="font-semibold text-grey column-items mr-5">
              Items Count
            </div>
            <div className="font-semibold text-grey column-date">Date</div>
            <div className="font-semibold text-grey column-status">Status</div>
            <div className="font-semibold text-grey column-action">Action</div>
          </div>
          {vendors.length > 0 ? (
            visiblePage.map((v, id) => (
              <div
                key={id}
                className="border-b flex items-center justify-between gap-10 py-3"
              >
                <div className="text-grey font-normal column-img">
                  <img
                    src={v.picture}
                    alt=""
                    className="w-16 h-14 rounded-full ml-2"
                  />
                </div>
                <div className="text-grey font-normal column-firstName">
                  {v.firstName}
                </div>
                <div className="text-grey font-normal column-lastName">
                  {v.lastName}
                </div>
                <div className="text-grey font-normal column-email">
                  {v.email}
                </div>
                <div className="text-grey font-normal column-items ">
                  {ItemCount(v.firstName)}
                </div>
                <div className="text-grey font-normal column-date">
                  {DateFormat(v.updatedAt)}
                </div>
                <div className="text-grey font-normal column-status leading-none">
                  <span
                    className={
                      v.status === 'active'
                        ? 'bg-statusBlue rounded-lg px-2 text-white py-1'
                        : 'bg-[#E06207] rounded-lg px-2 text-white py-1'
                    }
                  >
                    {v.status}
                  </span>
                </div>
                <div className="flex gap-4 items-center column-action">
                  <button type="submit" onClick={() => HandleActive(v)}>
                    <RefreshCcw className="w-5" />
                  </button>
                  <button type="submit" onClick={() => HandleEdit(v)}>
                    <Power className="w-5 text-redBg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="ml-8 mt-10">No Vendor Found</div>
          )}
          <div className="flex p-3 justify-end items-center mt-2 mr-2 text-xl text-[#9095A1]">
            <button
              type="submit"
              className="pr-2 cursor-pointer"
              onClick={() => HandlePrev()}
            >
              <ChevronLeft />
            </button>
            {pages &&
              pages.map((page) => (
                <button
                  key={page}
                  type="submit"
                  className={`cursor-pointer w-10 h-10  hover:translate ${
                    currentPage === page
                      ? 'border border-primary rounded-full'
                      : ''
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {`${page} `}
                </button>
              ))}
            <button
              type="submit"
              className="pl-2 cursor-pointer"
              onClick={() => HandleNext()}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {vendors &&
          visiblePage.map((v, id) => (
            <div key={id} className="border p-4 rounded-lg mb-4 bg-white">
              <div className="flex items- mb-2 gap-4 ">
                <img
                  src={v.picture}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4 ">
                  <p className="font-semibold text-grey">
                    {v.firstName} {v.lastName}
                  </p>
                  <p className="text-grey">{v.email}</p>
                </div>
              </div>
              <div className="pt-16 ml-2 leading-7">
                <p className="text-grey">First Name: {v.firstName}</p>
                <p className="text-grey">Items: {ItemCount(v.lastName)}</p>
                <p className="text-grey">Date: {DateFormat(v.updatedAt)}</p>
                <p className="text-grey">
                  Status:
                  <span
                    className={
                      v.status === 'active'
                        ? 'bg-statusBlue px-2 py-0.5 ml-1 rounded-md'
                        : 'bg-[#E06207] px-2 py-0.5 ml-1 rounded-md'
                    }
                  >
                    {v.status}
                  </span>
                </p>
              </div>
              <div className="flex justify-end items-end ">
                <button
                  type="submit"
                  onClick={() => HandleActive(v)}
                  className="mr-2"
                >
                  <RefreshCcw className="w-5" />
                </button>
                <button type="submit">
                  <Power
                    className="w-5 text-redBg"
                    onClick={() => HandleEdit(v)}
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Seller;
