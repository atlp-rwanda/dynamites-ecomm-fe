import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyers } from '@/app/Dashboard/buyerSlice';
import { fetchOrders } from '@/app/Dashboard/orderSlice';
import { useAppSelector } from '@/app/hooks';
import { AppDispatch, RootState } from '@/app/store';
import UserMetricsChart from '../Chart';
import TopCategories from '../TopCategories';
import SalesMap from '../salesMap/SalesMap';
import ProductTable from './BestSellingProducts';

function HomeDash() {
  const Role = useAppSelector((state) => state.signIn.user?.userType.name);

  function getGreeting(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return 'Good Morning';
    }
    if (hour < 18) {
      return 'Good Afternoon';
    }
    return 'Good Evening';
  }

  const greetings = getGreeting();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBuyers());
    dispatch(fetchOrders());
  }, [dispatch]);

  const currentUser = useAppSelector((state) => state.signIn.user);
  const { buyers } = useSelector((state: RootState) => state.buyer);
  const { order } = useSelector((state: RootState) => state.order);
  const [sum, setSum] = useState(0);
  const [tproduct, setAllproduct] = useState(0);

  const calculateTotalSum = useCallback(
    () =>
      order.reduce(
        (Tsum, ord) => (ord.paid ? Tsum + ord.totalAmount : Tsum),
        0
      ),
    [order]
  );
  const CalculateTProduct = useCallback(() => {
    return order
      .filter((o) => o.paid)
      .reduce((totalproduct, o) => totalproduct + o.orderDetails.length, 0);
  }, [order]);

  useEffect(() => {
    setSum(calculateTotalSum());
    setAllproduct(CalculateTProduct());
  }, [order, calculateTotalSum, CalculateTProduct]);

  return (
    <div className="bg-dashgrey min-h-screen">
      <div className="rounded-md">
        <div className="md:flex items-center justify-between rounded-2xl bg-white p-4">
          <div>
            <p className="text-dashgreytext text-sm">{greetings}, </p>
            <div className="font-semibold text-2xl">
              {currentUser?.lastName}
            </div>
          </div>
          <div>
            <img src="/icons/farmer.svg" alt="farmer" />
          </div>
        </div>
        {Role === 'Admin' && (
          <>
            <div className="mt-4 p-5 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <h1>Total Sales Available</h1>
                <button
                  className="border flex items-center px-2 py-1 rounded-md"
                  type="submit"
                >
                  <img src="/icons/ExportIcon.svg" alt="Export" />
                  Export
                </button>
              </div>
              <p className="text-dashgreytext text-sm mb-7">Sales Summary</p>
              <div className="grid md:grid-cols-4 gap-2">
                <div className="bg-salesbg p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xl font-semibold py-4">
                    <div className="bg-iconsales p-1 rounded-full w-8">
                      <img src="/icons/SalesIcon.svg" alt="Sales" />
                    </div>
                    <div>
                      <div>{sum}$</div>
                    </div>
                  </div>
                  <div className="text-md font-medium text-dashgreytext">
                    Total Sales
                  </div>
                  <p className="text-sm text-dashbordblue">
                    All Products Sales
                  </p>
                </div>
                <div className="bg-orderbg p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xl font-semibold py-4">
                    <div className="bg-iconorder p-1 rounded-full w-8">
                      <img src="/icons/OrderIcon.svg" alt="Order" />
                    </div>
                    <div>{order.length}</div>
                  </div>
                  <div className="text-md font-medium text-dashgreytext">
                    Total Order
                  </div>
                  <p className="text-sm text-dashbordblue">All Orders </p>
                </div>
                <div className="bg-psoldbg p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xl font-semibold py-4">
                    <div className="bg-psoldicon p-1 rounded-full w-8">
                      <img src="/icons/DiscIcon.svg" alt="Product Sold" />
                    </div>
                    <div>{tproduct}</div>
                  </div>
                  <div className="text-md font-medium text-dashgreytext">
                    Product Sold
                  </div>
                  <p className="text-sm text-dashbordblue">
                    All Products Sold{' '}
                  </p>
                </div>
                <div className="bg-customerbg p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xl font-semibold py-4">
                    <div className="bg-customericon p-1 rounded-full">
                      <img src="/icons/AddPeople.svg" alt="New Customers" />
                    </div>
                    <div>
                      {buyers &&
                        buyers.filter(
                          (user) =>
                            user.userType && user.userType.name === 'Buyer'
                        ).length}
                    </div>
                  </div>
                  <div className="text-md font-medium text-dashgreytext">
                    New Customers
                  </div>
                  <p className="text-sm text-dashbordblue">All Buyers</p>
                </div>
              </div>
            </div>
            <div className="w-full xs:flex-col lg:flex-row mt-4 flex items-center xs:gap-4 lg:gap-4">
              <UserMetricsChart />
              <TopCategories />
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <SalesMap />
              <ProductTable />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeDash;
