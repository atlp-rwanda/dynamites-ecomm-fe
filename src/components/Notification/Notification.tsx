import { useState, useEffect } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import SingleNotification from './SingleNotification'
import { MdOutlineMarkEmailUnread, MdOutlineMarkEmailRead } from "react-icons/md";
import { FaWindowClose } from 'react-icons/fa';
import {Search} from 'lucide-react';
import CircularPagination from '@/components/dashBoard/NavigateonPage';
import { AppDispatch, RootState } from '../../app/store';
import NotificationBox from '@/types/notification'
import {fetchNotification} from '@/features/Notification/NotificationSlice'
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '@/utils/ToastConfig';

function Notification() {
  const dispatch = useDispatch<AppDispatch>();
  const {notification, status} = useSelector(
    (state: RootState) => state.notification
  );
useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

const navigate = useNavigate();
const convertNewlinesToBr = (text: string) => {
  return text.replace(/\n/g, '<br>');
};

const [currentPage, setCurrentPage] = useState(1);
const [isfocused, setfocused] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [clickedNotification, setclicked] = useState<NotificationBox | null>(null)
const [message_content, setmessagecontent] = useState('')
const notifications = [...notification]

function countReadNotifications(notifications: NotificationBox[]): number {
  return notifications.filter(notification => notification.isRead).length;
}


const number_of_read = countReadNotifications(notifications)
const number_of_all = notifications.length
const number_of_unread = number_of_all - number_of_read
const PRODUCTS_PER_PAGE = 3;
const totalPages = Math.ceil(notifications.length / PRODUCTS_PER_PAGE);
const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

const paginatedData = notifications
    .filter((notification) =>
      notification.message_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, startIndex + PRODUCTS_PER_PAGE);


const handlePageChange = (page: number) => {
    setCurrentPage(page);
    };

const handleopen = (notification:NotificationBox)=>{
  setclicked(notification)
  console.log(clickedNotification?.notification_id)
  setmessagecontent(convertNewlinesToBr(clickedNotification?.message_content || '')) 
  setfocused(true)
} 

const handleclose = ()=>{
  setfocused(false)
}

const handleDelete = async () => {
  setfocused(false)
  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/notification/vendor/${clickedNotification?.notification_id}`
    );
    navigate(`/dashboard/notifications`);
    dispatch(fetchNotification());
    showSuccessToast(`Notifications was Delete Successfully`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      navigate(`/dashboard/notifications`);
      showErrorToast(`Deleting failed`);
      throw new Error(
        `Error Deleting Notification ${error.message}`
      );
    } else {
      navigate(`/dashboard/notifications`);
      showErrorToast(`Deleting failed`);
      throw new Error(`Unexpected error occurred: ${error}`);
    }
  }
};

  return (
    <div className='bg-[#F5F6F6]'>
        <div className="mx-[6%]">
            <div className="md:flex md:gap-5">
            <div className="text-2xl font-medium">Notifications</div>
            </div>
            <div className="md:flex justify-between">
            <div className="flex gap-5 py-2 text-lg">
                <p>All ({number_of_all})</p>
                <div className="flex flex-row justify-center items-center">
                    <MdOutlineMarkEmailUnread className='text-primary'/>
                    <p className="text-primary">Unread ({number_of_unread})</p>
                </div>
                
                <div className="flex flex-row justify-center items-center">
                    <MdOutlineMarkEmailRead className='text-black'/>
                    <p className="">Read ({number_of_read})</p>
                </div>
            </div>
            <div className="relative">
                <Search className="absolute w-5 left-2 top-2" />
                <input
                type="text"
                placeholder="Search Customer"
                onChange={(e)=>setSearchTerm(e.target.value)}
                className="rounded-lg pl-10 gap-2 py-2 focus:border-none focus:outline-none w-full border-2 border-[#9095A1]"
                />
            </div>
            </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {status === 'loading' && (
          <div className="md:flex items-center justify-center mt-[10%]">
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
        {status == 'succeeded' &&
            <div className=" bg-white flex flex-col justify-center items-start mx-[5%] px-[2%] rounded-xl mt-[3%]">
                {paginatedData.map((notification) => (
                    <div key={notification.notification_id} onDoubleClick={()=> handleopen(notification)} className="w-full pt-[3%]">
                      <SingleNotification notification = {notification} />
                    </div>
                ))}
                <div className=" flex flex-row justify-end pb-[2%] pt-[2%] pr-[5%]">
                    <CircularPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        }

        {/* ----------------------------------------------------------------- */}
        {isfocused &&
          <div className="fixed top-0 z-50 bg-opacity-50 bg-black left-0 w-screen h-screen flex flex-row justify-center items-center">
            <div className="p-8 bg-white rounded-lg shadow-lg min-w-[50px] mx-auto">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <h2 className="font-bold text-primary text-xl">The E-Commerce</h2>
                </div>
                <div className="flex items-center ml-[20vw]">
                  <button
                    type="button"
                    onClick={()=> handleclose()}
                    className="ml-4 text-xl text-gray-400 hover:text-gray-600"
                  >
                    <FaWindowClose className="bg-white text-primary hover:text-gray-950" />
                  </button>
                </div>
              </div>
              <div className="">
                  <div className=" flex flex-row">
                    <div className="font-bold text-grey mr-[8px]">Title:</div>
                    <div className=" underline underline-offset-[8px]">{clickedNotification?.message_title}</div>
                  </div>
                  <div className=" flex flex-row">
                    <div className="" dangerouslySetInnerHTML={{ __html: message_content }} />
                  </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={()=> handleclose()}
                  className="px-4 py-1 bg-primary text-sm text-white rounded-md"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  className="px-4 py-1 bg-red-500 text-sm text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        }

        {/* ----------------------------------------------------------------- */}
    </div>
  )
}

export default Notification