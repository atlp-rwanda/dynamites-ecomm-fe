import { format, formatDistanceToNow } from 'date-fns';
import { IoNotificationsCircleSharp } from 'react-icons/io5';
import { MdOutlineMarkChatRead } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import NotificationBox from '@/types/notification';

interface SingleNotificationProps {
  notification: NotificationBox;
}

function SingleNotification({ notification }: SingleNotificationProps) {
  const formattedDate = format(new Date(notification.createdAt), 'EEEE p');
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  const handleDelete = () => {
    console.log(notification.notification_id);
  };
  const makeAsRead = () => {
    console.log('read');
  };
  return (
    <div className=" bg-white flex flex-row items-center justify-between py-[2%] rounded-xl px-[2%] border border-primary hover:shadow-md hover:shadow-primary">
      <div className=" flex flex-row gap-x-[5%]">
        <div className="flex flex-low items-center justify-center">
          <IoNotificationsCircleSharp className="min-w-[40px] min-h-[40px] text-primary" />
        </div>
        <div className=" flex flex-col">
          <div className=" font-bold text-primary">E-Commerce</div>
          <div className=" pb-[10px] text-dashgreytext">
            {notification.message_title}
          </div>
          <div className=" max-w-[40vw] truncate">
            {notification.message_content}
          </div>
          <div className="text-grey pt-[10px] ">{formattedDate}</div>
        </div>
      </div>
      <div className=" flex flex-col">
        <div className=" flex flex-row items-center justify-between px-[0.7vw] pb-[2vh]">
          <div
            onClick={() => makeAsRead()}
            className="h-[36px] w-[36px] rounded-full flex items-center justify-center hover:border-primary hover:border"
          >
            <MdOutlineMarkChatRead
              className={` ${notification.isRead ? 'text-black' : 'text-primary'} w-[20px] h-[20px]`}
            />
          </div>
          <div
            onClick={() => handleDelete()}
            className="h-[36px] w-[36px] rounded-full flex items-center justify-center hover:border-primary hover:border"
          >
            <FaRegTrashAlt className="text-red-500 w-[20px] h-[20px]" />
          </div>
        </div>
        <div className="text-grey">{timeAgo}</div>
      </div>
    </div>
  );
}

export default SingleNotification;
