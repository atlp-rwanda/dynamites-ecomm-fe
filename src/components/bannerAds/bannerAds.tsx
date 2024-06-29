import { IoIosArrowRoundForward } from 'react-icons/io';

interface MyBannerAdsProps {
  s_title: string;
  title: string;
  description: string;
  image: string;
}

function BannerAd({ s_title, title, description, image }: MyBannerAdsProps) {
  return (
    <div className="p-4 bg-bannerBg shadow-md flex flex-wrap xs:p-2 sm:flex-nowrap md:flex-nowrap  lg:flex-nowrap justify-center items-center space-x-4 rounded-md">
      <div className="p-4 xs:w-full md:w-1/2 lg:w-1/2">
        <p className="text-redBg">{s_title}</p>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-[#424856]">{description}</p>
        <button
          type="button"
          className="flex  bg-white text-black  hover:bg-[#6D31ED] hover:text-white justify-center  items-center px-3 py-1 rounded-3xl hover:shadow-lg hover:scale-105  mt-4 ml-[-5]"
        >
          Shop Now{' '}
          <IoIosArrowRoundForward
            size={18}
            color="black"
            hover-color="white"
            title="icon"
          />
        </button>
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg md:w-1/2 lg:w-1/2"
      />
    </div>
  );
}

export default BannerAd;
